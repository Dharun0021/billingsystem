"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem, FoodItem } from "./data"
import { api, setAuthToken, removeAuthToken, getAuthToken } from "./api"

type UserRole = "admin" | "billing"
type AdminPage = "dashboard" | "categories" | "food-items" | "sales" | "reports" | "users" | "settings"
type BillingPage = "pos" | "orders-today"
type Page = AdminPage | BillingPage

interface AppState {
  isLoggedIn: boolean
  userRole: UserRole | null
  userName: string
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  activeSection: "admin" | "billing"
  setActiveSection: (section: "admin" | "billing") => void
  currentPage: Page
  setCurrentPage: (page: Page) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  cart: CartItem[]
  addToCart: (item: FoodItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  triggerPayment: boolean
  setTriggerPayment: (v: boolean) => void
}

const AppContext = createContext<AppState | null>(null)

const FALLBACK_CREDENTIALS = [
  { email: "admin@foodhub.com", password: "admin123", name: "Rajesh Kumar", role: "admin" as UserRole },
  { email: "billing@foodhub.com", password: "billing123", name: "Priya Sharma", role: "billing" as UserRole },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [userName, setUserName] = useState("")
  const [activeSection, setActiveSection] = useState<"admin" | "billing">("admin")
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<CartItem[]>([])
  const [triggerPayment, setTriggerPayment] = useState(false)

  // Verify existing token on startup
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      api.auth
        .getMe()
        .then((res) => {
          if (res.success && res.user) {
            const role = (res.user.role?.toLowerCase() === "admin" ? "admin" : "billing") as UserRole
            setIsLoggedIn(true)
            setUserRole(role)
            setUserName(res.user.name)
            setActiveSection(role === "admin" ? "admin" : "billing")
            setCurrentPage(role === "admin" ? "dashboard" : "pos")
          }
        })
        .catch(() => {
          removeAuthToken()
        })
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // 1. Try real backend API
      const res = await api.auth.login({ email, password });
      if (res.success && res.token) {
        setAuthToken(res.token)
        const role = (res.user.role?.toLowerCase() === "admin" ? "admin" : "billing") as UserRole
        setIsLoggedIn(true)
        setUserRole(role)
        setUserName(res.user.name)
        setActiveSection(role === "admin" ? "admin" : "billing")
        setCurrentPage(role === "admin" ? "dashboard" : "pos")
        return { success: true }
      }
      return { success: false, error: res.message || "Invalid credentials" }
    } catch (err: any) {
      console.warn("Backend API unavailable or error:", err.message);

      // Fallback to local credentials if backend is momentarily unreachable
      const fallback = FALLBACK_CREDENTIALS.find((c) => c.email === email && c.password === password)
      if (fallback) {
        setIsLoggedIn(true)
        setUserRole(fallback.role)
        setUserName(fallback.name)
        setActiveSection(fallback.role === "admin" ? "admin" : "billing")
        setCurrentPage(fallback.role === "admin" ? "dashboard" : "pos")
        return { success: true }
      }
      return { success: false, error: err.message || "Invalid email or password" }
    }
  }

  const logout = () => {
    removeAuthToken()
    setIsLoggedIn(false)
    setUserRole(null)
    setUserName("")
    setCurrentPage("dashboard")
    setCart([])
  }

  const addToCart = (item: FoodItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id)
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((c) => c.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCart((prev) => prev.map((c) => (c.id === itemId ? { ...c, quantity } : c)))
  }

  const clearCart = () => setCart([])

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        userRole,
        userName,
        login,
        logout,
        activeSection,
        setActiveSection,
        currentPage,
        setCurrentPage,
        selectedCategory,
        setSelectedCategory,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        triggerPayment,
        setTriggerPayment,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppStore() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useAppStore must be used within AppProvider")
  return ctx
}
