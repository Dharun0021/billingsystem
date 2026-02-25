"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/store"
import {
    LayoutDashboard,
    FolderOpen,
    UtensilsCrossed,
    History,
    BarChart3,
    UsersRound,
    Settings,
    ShoppingCart,
    ClipboardList,
    ChevronDown,
    Tag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/data"

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

export function Sidebar() {
    const { userRole, currentPage, setCurrentPage, selectedCategory, setSelectedCategory } = useAppStore()
    const [categoriesOpen, setCategoriesOpen] = useState(false)

    const navItems = userRole === "billing" ? billingNav : adminNav

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName)
        setCurrentPage("pos")
    }

    return (
        <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-sidebar">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md shadow-primary/20 transition-transform duration-200 hover:scale-105">
                    <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                    <h1 className="text-base font-bold text-sidebar-foreground tracking-tight">FoodHub</h1>
                    <p className="text-xs text-muted-foreground">Restaurant Manager</p>
                </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {/* Collapsible Categories — billing only */}
                {userRole === "billing" && (
                    <div className="mb-1">
                        {/* Categories accordion header */}
                        <button
                            onClick={() => setCategoriesOpen((prev) => !prev)}
                            className={cn(
                                "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                categoriesOpen
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                            )}
                        >
                            <span className="flex items-center gap-3">
                                <Tag className="h-4 w-4" />
                                Categories
                            </span>
                            <ChevronDown
                                className={cn(
                                    "h-4 w-4 transition-transform duration-300",
                                    categoriesOpen ? "rotate-180" : "rotate-0"
                                )}
                            />
                        </button>

                        {/* Animated collapsible list */}
                        <div
                            className="overflow-hidden transition-all duration-300 ease-in-out"
                            style={{
                                maxHeight: categoriesOpen ? `${(categories.length + 1) * 44}px` : "0px",
                                opacity: categoriesOpen ? 1 : 0,
                            }}
                        >
                            <div className="mt-1 ml-3 space-y-0.5 border-l-2 border-border pl-3">
                                {/* All Items */}
                                <button
                                    onClick={() => handleCategoryClick("All")}
                                    className={cn(
                                        "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium transition-all duration-150",
                                        currentPage === "pos" && selectedCategory === "All"
                                            ? "text-primary bg-primary/5"
                                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                    )}
                                >
                                    <span className={cn("h-1.5 w-1.5 rounded-full", currentPage === "pos" && selectedCategory === "All" ? "bg-primary" : "bg-primary/40")} />
                                    All Items
                                </button>

                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryClick(cat.name)}
                                        className={cn(
                                            "flex w-full items-center justify-between rounded-lg px-2 py-2 text-xs font-medium transition-all duration-150",
                                            currentPage === "pos" && selectedCategory === cat.name
                                                ? "text-primary bg-primary/5"
                                                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                                        )}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className={cn("h-1.5 w-1.5 rounded-full", currentPage === "pos" && selectedCategory === cat.name ? "bg-primary" : "bg-primary/40")} />
                                            {cat.name}
                                        </span>
                                        <span className="text-[10px] bg-secondary text-muted-foreground rounded-full px-1.5 py-0.5">
                                            {cat.itemCount}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main nav links */}
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
                                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.label}
                        </button>
                    )
                })}
            </nav>
        </aside>
    )
}
