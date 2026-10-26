"use client"

import { useState } from "react"
import { useAppStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { UtensilsCrossed, Eye, EyeOff, AlertCircle, ShieldCheck, Receipt } from "lucide-react"
import { cn } from "@/lib/utils"

type LoginRole = "admin" | "billing"

export function LoginPage() {
  const { login } = useAppStore()
  const [selectedRole, setSelectedRole] = useState<LoginRole>("admin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(email, password)
      if (!result.success) {
        setError(result.error || (
          selectedRole === "admin"
            ? "Invalid credentials. Try admin@foodhub.com / admin123"
            : "Invalid credentials. Try billing@foodhub.com / billing123"
        ))
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoleSwitch = (role: LoginRole) => {
    setSelectedRole(role)
    setError("")
    if (role === "admin") {
      setEmail("admin@foodhub.com")
      setPassword("admin123")
    } else {
      setEmail("billing@foodhub.com")
      setPassword("billing123")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25 transition-transform duration-300 hover:scale-105">
            <UtensilsCrossed className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">FoodHubDHARUN</h1>
            <p className="text-sm text-muted-foreground mt-1">Restaurant Management System</p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleRoleSwitch("admin")}
            className={cn(
              "flex-1 flex flex-col items-center gap-2 rounded-xl p-4 border-2 transition-all duration-300",
              selectedRole === "admin"
                ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
            )}
          >
            <div className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300",
              selectedRole === "admin" ? "bg-primary/15" : "bg-secondary"
            )}>
              <ShieldCheck className={cn(
                "h-5 w-5 transition-colors duration-300",
                selectedRole === "admin" ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <span className={cn(
              "text-sm font-semibold transition-colors duration-300",
              selectedRole === "admin" ? "text-primary" : "text-foreground"
            )}>Admin</span>
            <span className="text-[10px] text-muted-foreground">Full access</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSwitch("billing")}
            className={cn(
              "flex-1 flex flex-col items-center gap-2 rounded-xl p-4 border-2 transition-all duration-300",
              selectedRole === "billing"
                ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
            )}
          >
            <div className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300",
              selectedRole === "billing" ? "bg-primary/15" : "bg-secondary"
            )}>
              <Receipt className={cn(
                "h-5 w-5 transition-colors duration-300",
                selectedRole === "billing" ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <span className={cn(
              "text-sm font-semibold transition-colors duration-300",
              selectedRole === "billing" ? "text-primary" : "text-foreground"
            )}>Billing</span>
            <span className="text-[10px] text-muted-foreground">POS access</span>
          </button>
        </div>

        {/* Login Form */}
        <Card className="border-border shadow-xl shadow-primary/5">
          <CardContent className="pt-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={selectedRole === "admin" ? "admin@foodhub.com" : "billing@foodhub.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 bg-input border-border text-foreground placeholder:text-muted-foreground pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2.5 text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md shadow-primary/25 transition-all duration-200 active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Signing in...
                  </span>
                ) : (
                  `Sign In as ${selectedRole === "admin" ? "Admin" : "Billing"}`
                )}
              </Button>
            </form>

            <div className="mt-5 pt-4 border-t border-border">
              <div className="rounded-xl bg-primary/5 border border-primary/10 p-4">
                <p className="text-xs font-semibold text-foreground mb-2">Demo Credentials</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Admin Login</p>
                    <p className="text-xs text-foreground font-mono">admin@foodhub.com</p>
                    <p className="text-xs text-foreground font-mono">admin123</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Billing Login</p>
                    <p className="text-xs text-foreground font-mono">billing@foodhub.com</p>
                    <p className="text-xs text-foreground font-mono">billing123</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
