"use client"

import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { foodItems as initialFoodItems, type FoodItem } from "@/lib/data"
import { api } from "@/lib/api"
import {
  Plus,
  Minus,
  CreditCard,
  Printer,
  CheckCircle,
  QrCode,
  ArrowLeft,
  Banknote,
  Smartphone,
  Wallet,
  ShoppingCart,
} from "lucide-react"

type ViewState = "pos" | "payment" | "success"

export function POSPage() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, selectedCategory, triggerPayment, setTriggerPayment } = useAppStore()
  const [items, setItems] = useState<FoodItem[]>(initialFoodItems)
  const [paymentMethod, setPaymentMethod] = useState("Cash")
  const [discount, setDiscount] = useState("")
  const [gstEnabled, setGstEnabled] = useState(true)
  const [viewState, setViewState] = useState<ViewState>("pos")
  const [customerName, setCustomerName] = useState("")

  useEffect(() => {
    api.menu.getItems().then((res) => {
      if (res.success && res.items && res.items.length > 0) {
        setItems(
          res.items.map((i) => ({
            id: i.id || i._id,
            name: i.name,
            price: i.price,
            category: i.category,
            available: i.available !== undefined ? i.available : true,
            description: i.description || "",
            image: i.image || "/placeholder.svg",
          }))
        )
      }
    }).catch(() => {})
  }, [])

  // CartCTA outside this component triggers payment view via store
  useEffect(() => {
    if (triggerPayment && cart.length > 0) {
      setViewState("payment")
      setTriggerPayment(false)
    }
  }, [triggerPayment])

  const filteredItems =
    selectedCategory === "All"
      ? items.filter((i) => i.available)
      : items.filter((i) => i.category === selectedCategory && i.available)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = discount ? parseFloat(discount) || 0 : 0
  const afterDiscount = subtotal - discountAmount
  const gstAmount = gstEnabled ? afterDiscount * 0.18 : 0
  const finalAmount = afterDiscount + gstAmount

  const getCartQuantity = (itemId: string) => {
    return cart.find((c) => c.id === itemId)?.quantity ?? 0
  }

  const handleProceedToPay = () => {
    if (cart.length === 0) return
    setViewState("payment")
  }

  const handleConfirmPayment = async () => {
    try {
      await api.orders.create({
        items: cart.map((c) => ({
          name: c.name,
          quantity: c.quantity,
          price: c.price,
        })),
        paymentMethod,
        total: Math.round(finalAmount),
      })
    } catch (err) {
      console.warn("Could not save order to API, completed in UI:", err)
    }
    setViewState("success")
  }

  const handleNewOrder = () => {
    clearCart()
    setDiscount("")
    setCustomerName("")
    setPaymentMethod("Cash")
    setViewState("pos")
  }

  // Payment Page
  if (viewState === "payment") {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => setViewState("pos")}
          className="mb-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to POS
        </Button>

        <Card className="border-border shadow-lg">
          <CardHeader className="pb-4 border-b border-border">
            <CardTitle className="text-lg font-semibold text-card-foreground">Payment</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Order Summary */}
            <div className="rounded-xl bg-secondary p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">Order Summary</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Discount</span>
                    <span className="text-destructive">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {gstEnabled && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST (18%)</span>
                    <span className="text-foreground">${gstAmount.toFixed(2)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Customer Name */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Customer Name (optional)</Label>
              <Input
                placeholder="Enter customer name..."
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <Label className="text-xs font-medium text-muted-foreground">Select Payment Method</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "Cash", label: "Cash", icon: Banknote, desc: "Pay with cash" },
                  { id: "UPI", label: "UPI / QR", icon: Smartphone, desc: "Scan QR to pay" },
                  { id: "Card", label: "Card", icon: CreditCard, desc: "Credit / Debit card" },
                ].map((method) => {
                  const Icon = method.icon
                  const isSelected = paymentMethod === method.id
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex flex-col items-center gap-2 rounded-xl p-4 border-2 transition-all duration-200 ${isSelected
                        ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                        : "border-border bg-card hover:border-primary/30 hover:bg-secondary"
                        }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${isSelected ? "bg-primary/10" : "bg-secondary"
                          }`}
                      >
                        <Icon className={`h-5 w-5 transition-colors duration-200 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <span className={`text-sm font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>{method.label}</span>
                      <span className="text-[10px] text-muted-foreground">{method.desc}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* QR Code for UPI */}
            {paymentMethod === "UPI" && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col items-center rounded-xl bg-card border-2 border-dashed border-primary/30 p-6">
                <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-secondary border border-border mb-4">
                  <div className="relative">
                    <QrCode className="h-32 w-32 text-foreground" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                        <Wallet className="h-5 w-5 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground">Scan to pay ${finalAmount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">Use any UPI app to scan this QR code</p>
                <div className="flex gap-3 mt-3">
                  {["GPay", "PhonePe", "Paytm"].map((app) => (
                    <Badge key={app} variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5 font-medium px-3 py-1">
                      {app}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={handleConfirmPayment}
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98]"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Confirm Payment - ${finalAmount.toFixed(2)}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Success Page
  if (viewState === "success") {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-in fade-in zoom-in-95 duration-500">
        <Card className="border-border shadow-xl max-w-sm w-full text-center">
          <CardContent className="pt-10 pb-8 px-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6 animate-in zoom-in duration-300">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-card-foreground">Payment Successful</h2>
            <p className="text-2xl font-bold text-primary mt-2">${finalAmount.toFixed(2)}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs border-primary/20 text-primary bg-primary/5 font-medium">
                {paymentMethod}
              </Badge>
              {customerName && (
                <Badge variant="outline" className="text-xs border-border text-muted-foreground font-normal">
                  {customerName}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Order #{String(Date.now()).slice(-6)} has been placed successfully
            </p>
            <div className="grid grid-cols-2 gap-3 mt-8">
              <Button
                variant="outline"
                className="h-11 border-border text-foreground hover:bg-secondary transition-all duration-200"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Bill
              </Button>
              <Button
                onClick={handleNewOrder}
                className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-200 active:scale-[0.98]"
              >
                New Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main POS View
  return (
    <div className="flex flex-col gap-4 pb-28">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 w-full">
        {filteredItems.map((item) => {
          const qty = getCartQuantity(item.id)
          return (
            <Card
              key={item.id}
              className={`border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${qty > 0 ? "ring-2 ring-primary/20 shadow-primary/10" : ""
                }`}
            >
              <CardContent className="p-2.5 flex flex-col items-center text-center">
                {/* Food image */}
                <div className="h-20 w-full rounded-lg overflow-hidden mb-2 bg-secondary">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      const t = e.currentTarget
                      t.style.display = "none"
                      t.parentElement!.innerHTML = `<div class="h-full w-full flex items-center justify-center text-2xl">🍽️</div>`
                    }}
                  />
                </div>
                <h3 className="text-xs font-semibold text-card-foreground truncate w-full leading-snug">{item.name}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">{item.category}</p>
                <span className="text-xs font-bold text-primary mt-1.5">${item.price}</span>
                <div className="w-full mt-2">
                  {qty > 0 ? (
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        className="h-6 w-6 rounded-md border border-border bg-background flex items-center justify-center text-foreground hover:bg-secondary transition-colors duration-150 active:scale-95"
                        onClick={() => updateQuantity(item.id, qty - 1)}
                      >
                        <Minus className="h-2.5 w-2.5" />
                      </button>
                      <span className="h-6 min-w-[22px] px-1.5 rounded-md bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center shadow-sm">
                        {qty}
                      </span>
                      <button
                        className="h-6 w-6 rounded-md border border-border bg-background flex items-center justify-center text-foreground hover:bg-secondary transition-colors duration-150 active:scale-95"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full h-7 rounded-lg bg-primary text-white text-[11px] font-semibold flex items-center justify-center gap-1 shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all duration-150 active:scale-[0.97]"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="h-2.5 w-2.5" />
                      Add
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

/**
 * CartCTA — mounted in AppShell OUTSIDE the scrollable <main>.
 * This ensures `fixed` positioning is relative to the true viewport,
 * not the overflow-y-auto scroll container.
 */
export function CartCTA() {
  const { cart, currentPage, triggerPayment, setTriggerPayment } = useAppStore()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const gstAmount = subtotal * 0.18
  const finalAmount = subtotal + gstAmount
  const totalQty = cart.reduce((s, i) => s + i.quantity, 0)

  if (currentPage !== "pos" || cart.length === 0) return null

  return (
    <div className="fixed bottom-5 left-0 lg:left-64 right-0 z-[100] flex justify-center pointer-events-none">
      <div
        className="pointer-events-auto overflow-hidden animate-in slide-in-from-bottom-4 duration-300 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #fb923c 0%, #f97316 40%, #ea580c 100%)",
          boxShadow: "0 8px 40px rgba(249,115,22,0.50), 0 2px 12px rgba(0,0,0,0.20)",
          minWidth: "320px",
          maxWidth: "460px",
          width: "calc(100vw - 48px)",
        }}
      >
        <div className="flex items-center gap-3 px-5 py-2.5">

          {/* Cart icon with badge */}
          <div className="relative flex-shrink-0">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: "rgba(255,255,255,0.20)" }}
            >
              <ShoppingCart className="h-4 w-4 text-white" />
            </div>
            <span
              className="absolute -top-1.5 -right-1.5 h-4 min-w-[16px] px-0.5 flex items-center justify-center rounded-full text-[10px] font-bold"
              style={{ background: "white", color: "#ea580c" }}
            >
              {totalQty}
            </span>
          </div>

          {/* Label */}
          <div className="flex-1">
            <p className="text-[11px] font-semibold text-white">{totalQty} item{totalQty !== 1 ? "s" : ""} in cart</p>
            <p className="text-[10px]" style={{ color: "rgba(255,237,213,0.85)" }}>incl. 18% GST</p>
          </div>

          {/* Total */}
          <p className="flex-shrink-0 text-[17px] font-extrabold text-white mr-2">${finalAmount.toFixed(2)}</p>

          {/* White Pay Now button */}
          <button
            onClick={() => setTriggerPayment(true)}
            className="flex-shrink-0 flex items-center gap-2 h-9 px-5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-[0.97]"
            style={{
              background: "white",
              color: "#ea580c",
              boxShadow: "0 3px 14px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.25)",
            }}
          >
            <CreditCard className="h-4 w-4" />
            Pay Now
          </button>
        </div>
      </div>
    </div>
  )
}

function FoodIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}
