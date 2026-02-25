"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings as SettingsIcon, Store, Receipt, Bell, Save } from "lucide-react"

export function SettingsPage() {
  const [settings, setSettings] = useState({
    restaurantName: "FoodHub Restaurant",
    address: "123 Main Street, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "info@foodhub.com",
    gstEnabled: true,
    gstRate: "18",
    serviceCharge: "10",
    emailNotifications: true,
    orderAlerts: true,
  })

  return (
    <div className="space-y-8">
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Store className="h-4 w-4 text-primary" />
            </div>
            Restaurant Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Restaurant Name</Label>
              <Input
                value={settings.restaurantName}
                onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
                className="h-11 bg-input border-border text-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Phone</Label>
              <Input
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="h-11 bg-input border-border text-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Email</Label>
              <Input
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="h-11 bg-input border-border text-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Address</Label>
              <Input
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="h-11 bg-input border-border text-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <Button className="h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-200 active:scale-[0.98]">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Receipt className="h-4 w-4 text-primary" />
            </div>
            Tax & Charges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
            <div>
              <p className="text-sm font-semibold text-card-foreground">GST Enabled</p>
              <p className="text-xs text-muted-foreground mt-0.5">Apply GST on all orders</p>
            </div>
            <Switch
              checked={settings.gstEnabled}
              onCheckedChange={(v) => setSettings({ ...settings, gstEnabled: v })}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">GST Rate (%)</Label>
              <Input
                value={settings.gstRate}
                onChange={(e) => setSettings({ ...settings, gstRate: e.target.value })}
                className="h-11 bg-input border-border text-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Service Charge (%)</Label>
              <Input
                value={settings.serviceCharge}
                onChange={(e) => setSettings({ ...settings, serviceCharge: e.target.value })}
                className="h-11 bg-input border-border text-foreground transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
            <div>
              <p className="text-sm font-semibold text-card-foreground">Email Notifications</p>
              <p className="text-xs text-muted-foreground mt-0.5">Receive daily sales reports via email</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(v) => setSettings({ ...settings, emailNotifications: v })}
            />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-secondary p-4">
            <div>
              <p className="text-sm font-semibold text-card-foreground">Order Alerts</p>
              <p className="text-xs text-muted-foreground mt-0.5">Get notified for new orders</p>
            </div>
            <Switch
              checked={settings.orderAlerts}
              onCheckedChange={(v) => setSettings({ ...settings, orderAlerts: v })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
