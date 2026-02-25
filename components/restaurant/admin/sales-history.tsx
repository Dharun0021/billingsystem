"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { orders, categories, type Order } from "@/lib/data"
import { Eye, Filter } from "lucide-react"
import { Label } from "@/components/ui/label"

export function SalesHistoryPage() {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    if (paymentFilter !== "all" && order.paymentMethod !== paymentFilter) return false
    if (dateFrom && order.date < dateFrom) return false
    if (dateTo && order.date > dateTo) return false
    if (categoryFilter !== "all") {
      const hasCategory = order.items.some((item) => {
        const allCatNames = categories.map((c) => c.name)
        return allCatNames.includes(categoryFilter)
      })
      if (!hasCategory) return false
    }
    return true
  })

  return (
    <div className="space-y-8">
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Filter className="h-4 w-4 text-primary" />
            </div>
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">From Date</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-11 bg-input border-border text-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">To Date</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="h-11 bg-input border-border text-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-11 bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all" className="text-popover-foreground">All Categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.name} className="text-popover-foreground">{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Payment Method</Label>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="h-11 bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all" className="text-popover-foreground">All Methods</SelectItem>
                  <SelectItem value="Cash" className="text-popover-foreground">Cash</SelectItem>
                  <SelectItem value="UPI" className="text-popover-foreground">UPI</SelectItem>
                  <SelectItem value="Card" className="text-popover-foreground">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-card-foreground">
            Sales History ({filteredOrders.length} orders)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Order ID</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Items</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Qty</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Payment</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Total</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">Date</TableHead>
                  <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="border-border hover:bg-secondary/50 transition-colors duration-150">
                    <TableCell className="font-semibold text-primary">{order.id}</TableCell>
                    <TableCell className="text-card-foreground max-w-[200px] truncate">
                      {order.items.map((i) => i.name).join(", ")}
                    </TableCell>
                    <TableCell className="text-right text-card-foreground font-medium">
                      {order.items.reduce((a, i) => a + i.quantity, 0)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5 font-medium">
                        {order.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-card-foreground">${order.total}</TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-border text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span className="sr-only">View order {order.id}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="bg-card border-border text-card-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-card-foreground">
              Order {selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-secondary p-3">
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-semibold text-card-foreground mt-0.5">{selectedOrder.date}</p>
                </div>
                <div className="rounded-xl bg-secondary p-3">
                  <p className="text-xs text-muted-foreground">Payment</p>
                  <p className="font-semibold text-card-foreground mt-0.5">{selectedOrder.paymentMethod}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Items</p>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm py-2.5 px-3 rounded-lg bg-secondary">
                      <span className="text-card-foreground font-medium">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold text-card-foreground">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-base font-bold pt-3 border-t border-border">
                <span className="text-card-foreground">Total</span>
                <span className="text-primary">${selectedOrder.total}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
