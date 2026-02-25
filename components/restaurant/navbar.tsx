"use client"

import { useAppStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, UtensilsCrossed, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderOpen,
  History,
  BarChart3,
  UsersRound,
  Settings,
  ShoppingCart,
  ClipboardList,
} from "lucide-react"

const adminNav = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "categories" as const, label: "Categories", icon: FolderOpen },
  { id: "food-items" as const, label: "Food Items", icon: UtensilsCrossed },
  { id: "sales" as const, label: "Sales History", icon: History },
  { id: "reports" as const, label: "Reports", icon: BarChart3 },
  { id: "users" as const, label: "Users", icon: UsersRound },
  { id: "settings" as const, label: "Settings", icon: Settings },
]

const billingNav = [
  { id: "pos" as const, label: "Billing POS", icon: ShoppingCart },
  { id: "orders-today" as const, label: "Orders Today", icon: ClipboardList },
]

export function Navbar() {
  const { activeSection, setActiveSection, userName, userRole, currentPage, setCurrentPage, logout } = useAppStore()
  const navItems = activeSection === "admin" ? adminNav : billingNav

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-foreground hover:bg-secondary transition-colors duration-200">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-card p-0 border-border">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20">
                <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-base font-bold text-foreground tracking-tight">FoodHub</h1>
                <p className="text-xs text-muted-foreground">Restaurant Manager</p>
              </div>
            </div>

            {/* Section Tabs */}
            <div className="flex mx-4 mt-4 rounded-xl bg-secondary p-1">
              <button
                onClick={() => setActiveSection("admin")}
                className={cn(
                  "flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-200",
                  activeSection === "admin"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Admin
              </button>
              <button
                onClick={() => setActiveSection("billing")}
                className={cn(
                  "flex-1 rounded-lg py-2 text-xs font-semibold transition-all duration-200",
                  activeSection === "billing"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Billing
              </button>
            </div>

            <nav className="px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <h2 className="text-base font-semibold text-foreground hidden sm:block">
          {navItems.find((n) => n.id === currentPage)?.label ?? "Dashboard"}
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <User className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-medium text-foreground leading-none">{userName}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{userRole}</p>
          </div>
        </div>

        <Badge
          variant="outline"
          className={cn(
            "text-xs font-semibold px-3 py-1 transition-colors duration-200",
            userRole === "admin"
              ? "border-primary/30 text-primary bg-primary/5"
              : "border-chart-2/30 text-chart-2 bg-chart-2/5"
          )}
        >
          {userRole === "admin" ? "Admin" : "Billing"}
        </Badge>

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
          onClick={logout}
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
