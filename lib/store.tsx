"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { CartItem, FoodItem } from "./data"

type UserRole = "admin" | "billing"
type AdminPage = "dashboard" | "categories" | "food-items" | "sales" | "reports" | "users" | "settings"
type BillingPage = "pos" | "orders-today"
type Page = AdminPage | BillingPage

interface AppState {
  isLoggedIn: boolean
  userRole: UserRole | null
  userName: string
  login: (email: string, password: string) => { success: boolean; error?: string }
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

const CREDENTIALS = [
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

  const login = (email: string, password: string) => {
    const user = CREDENTIALS.find((c) => c.email === email && c.password === password)
    if (user) {
      setIsLoggedIn(true)
      setUserRole(user.role)
      setUserName(user.name)
      setActiveSection(user.role === "admin" ? "admin" : "billing")
      setCurrentPage(user.role === "admin" ? "dashboard" : "pos")
      return { success: true }
    }
    return { success: false, error: "Invalid email or password" }
  }
  const logout = () => {
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
