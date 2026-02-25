"use client"

import { useAppStore } from "@/lib/store"
import { Sidebar } from "@/components/restaurant/sidebar"
import { Navbar } from "./navbar"
import { LoginPage } from "./login-page"
import { Dashboard } from "./admin/dashboard"
import { CategoriesPage } from "./admin/categories"
import { FoodItemsPage } from "./admin/food-items"
import { SalesHistoryPage } from "./admin/sales-history"
import { ReportsPage } from "./admin/reports"
import { UsersPage } from "./admin/users-page"
import { SettingsPage } from "./admin/settings"
import { POSPage } from "./billing/pos"
import { CartCTA } from "./billing/pos"
import { OrdersTodayPage } from "./billing/orders-today"

function PageContent() {
  const { currentPage } = useAppStore()

  const pages: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,
    categories: <CategoriesPage />,
    "food-items": <FoodItemsPage />,
    sales: <SalesHistoryPage />,
    reports: <ReportsPage />,
    users: <UsersPage />,
    settings: <SettingsPage />,
    pos: <POSPage />,
    "orders-today": <OrdersTodayPage />,
  }

  return (
    <div className="animate-in fade-in duration-300">
      {pages[currentPage] ?? <Dashboard />}
    </div>
  )
}

export function AppShell() {
  const { isLoggedIn } = useAppStore()

  if (!isLoggedIn) {
    return <LoginPage />
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            <PageContent />
          </div>
        </main>
        {/* CartCTA lives outside <main> so fixed positioning anchors to the viewport */}
        <CartCTA />
      </div>
    </div>
  )
}
