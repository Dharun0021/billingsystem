"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { orders } from "@/lib/data"
import { ClipboardList, DollarSign, ShoppingBag, ChevronLeft, ChevronRight, CalendarDays } from "lucide-react"

// Get all unique dates from orders, sorted newest first
const allDates = [...new Set(orders.map((o) => o.date))].sort((a, b) => b.localeCompare(a))

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
}

export function OrdersTodayPage() {
  const [selectedDate, setSelectedDate] = useState(allDates[0] ?? "")

  const dateIndex = allDates.indexOf(selectedDate)
  const canGoNext = dateIndex > 0
  const canGoPrev = dateIndex < allDates.length - 1

  const filteredOrders = useMemo(
    () => orders.filter((o) => o.date === selectedDate),
    [selectedDate]
  )
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.total, 0)
  const avgOrder = filteredOrders.length > 0 ? Math.round(totalRevenue / filteredOrders.length) : 0

  return (
    <div className="space-y-6">

      {/* Day Picker */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Orders by Day</span>
        </div>
        <div
          className="flex items-center gap-2 rounded-xl border border-border bg-card shadow-sm px-1 py-1"
        >
          <button
            onClick={() => setSelectedDate(allDates[dateIndex + 1])}
            disabled={!canGoPrev}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2 px-3">
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">
              {selectedDate ? formatDate(selectedDate) : "—"}
            </span>
          </div>

          <button
            onClick={() => setSelectedDate(allDates[dateIndex - 1])}
            disabled={!canGoNext}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-150 hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Quick date dots */}
        <div className="hidden sm:flex items-center gap-1.5">
          {allDates.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              title={formatDate(d)}
              className={`h-2 w-2 rounded-full transition-all duration-200 ${d === selectedDate ? "bg-primary scale-125" : "bg-border hover:bg-primary/40"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: "Orders", value: filteredOrders.length.toString(), icon: ShoppingBag, color: "primary" },
          { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "chart-2" },
          { title: "Avg Order Value", value: `$${avgOrder}`, icon: ClipboardList, color: "chart-4" },
        ].map((card, idx) => {
          const Icon = card.icon
          return (
            <Card
              key={card.title}
              className="border-border shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${idx * 50}ms`, animationFillMode: "both" }}
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${card.color}/10`}>
                  <Icon className={`h-5 w-5 text-${card.color}`} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{card.title}</p>
                  <p className="text-xl font-bold text-card-foreground mt-0.5">{card.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Table */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-card-foreground">
            {selectedDate ? formatDate(selectedDate) : "Orders"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Items</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Payment</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="border-border hover:bg-secondary/50 transition-colors duration-150">
                    <TableCell className="text-card-foreground">
                      {order.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5 font-medium">
                        {order.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-card-foreground">${order.total}</TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-12">
                      No orders for this day
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
