"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DollarSign, ShoppingBag, TrendingUp, FolderOpen, UtensilsCrossed, CreditCard } from "lucide-react"
import { orders, salesOverview } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

const summaryCards = [
  { title: "Total Sales Today", value: "$3,860", icon: DollarSign, change: "+12%" },
  { title: "Sales This Month", value: "$48,520", icon: TrendingUp, change: "+8%" },
  { title: "Orders Today", value: "42", icon: ShoppingBag, change: "+5%" },
  { title: "Total Revenue", value: "$1,24,800", icon: CreditCard, change: "+15%" },
  { title: "Total Categories", value: "6", icon: FolderOpen, change: "" },
  { title: "Total Food Items", value: "20", icon: UtensilsCrossed, change: "" },
]

export function Dashboard() {
  const todayOrders = orders.filter((o) => o.date === "2026-02-25")

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {summaryCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <Card
              key={card.title}
              className="border-border shadow-sm hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${idx * 50}ms`, animationFillMode: "both" }}
            >
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-200 hover:scale-105">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground">{card.title}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <p className="text-xl font-bold text-card-foreground">{card.value}</p>
                    {card.change && (
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-md">
                        {card.change}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-card-foreground">Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Food Name</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Category</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Qty Sold</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesOverview.map((item) => (
                    <TableRow key={item.name} className="border-border hover:bg-secondary/50 transition-colors duration-150">
                      <TableCell className="font-medium text-card-foreground">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-border text-muted-foreground font-normal">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-card-foreground font-medium">{item.quantitySold}</TableCell>
                      <TableCell className="text-right text-primary font-semibold">
                        ${item.revenue.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold text-card-foreground">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Order ID</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Items</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Payment</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Total</TableHead>
                    <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayOrders.map((order) => (
                    <TableRow key={order.id} className="border-border hover:bg-secondary/50 transition-colors duration-150">
                      <TableCell className="font-semibold text-primary">{order.id}</TableCell>
                      <TableCell className="text-card-foreground">{order.items.length} items</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5 font-medium">
                          {order.paymentMethod}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-card-foreground">${order.total}</TableCell>
                      <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
