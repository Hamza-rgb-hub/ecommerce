"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Store, Bell, Mail, Shield } from "lucide-react"
import { useState } from "react"

export default function AdminSettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    name: "SoleStore",
    email: "support@solestore.com",
    phone: "1-800-SOLE-STORE",
    address: "123 Sneaker Lane, New York, NY 10001",
    currency: "USD",
    taxRate: "8",
    freeShippingMin: "100",
  })
  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    customerSignups: false,
    weeklyReport: true,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your store settings</p>
      </div>

      <div className="space-y-6">
        {/* Store Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Store className="h-5 w-5" /> Store Information</CardTitle>
            <CardDescription>General store settings and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input id="storeName" value={storeSettings.name} onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeEmail">Contact Email</Label>
                <Input id="storeEmail" type="email" value={storeSettings.email} onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storePhone">Phone Number</Label>
                <Input id="storePhone" value={storeSettings.phone} onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={storeSettings.currency} onValueChange={(v) => setStoreSettings({ ...storeSettings, currency: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" value={storeSettings.address} onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input id="taxRate" type="number" value={storeSettings.taxRate} onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="freeShipping">Free Shipping Minimum ($)</Label>
                <Input id="freeShipping" type="number" value={storeSettings.freeShippingMin} onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingMin: e.target.value })} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle>
            <CardDescription>Manage admin notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div><Label>New Orders</Label><p className="text-sm text-muted-foreground">Get notified when a new order is placed</p></div>
              <Switch checked={notifications.newOrders} onCheckedChange={(v) => setNotifications({ ...notifications, newOrders: v })} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Low Stock Alerts</Label><p className="text-sm text-muted-foreground">Alert when products are running low</p></div>
              <Switch checked={notifications.lowStock} onCheckedChange={(v) => setNotifications({ ...notifications, lowStock: v })} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Customer Signups</Label><p className="text-sm text-muted-foreground">Notify when new customers register</p></div>
              <Switch checked={notifications.customerSignups} onCheckedChange={(v) => setNotifications({ ...notifications, customerSignups: v })} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Weekly Report</Label><p className="text-sm text-muted-foreground">Receive weekly performance summary</p></div>
              <Switch checked={notifications.weeklyReport} onCheckedChange={(v) => setNotifications({ ...notifications, weeklyReport: v })} />
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Email Templates</CardTitle>
            <CardDescription>Customize automated email templates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Order Confirmation</Label>
              <p className="text-sm text-muted-foreground">Sent to customers after placing an order</p>
              <Button variant="outline" size="sm">Edit Template</Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Shipping Update</Label>
              <p className="text-sm text-muted-foreground">Sent when order status changes to shipped</p>
              <Button variant="outline" size="sm">Edit Template</Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Welcome Email</Label>
              <p className="text-sm text-muted-foreground">Sent to new customers after registration</p>
              <Button variant="outline" size="sm">Edit Template</Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Security</CardTitle>
            <CardDescription>Admin account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="Enter current password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" />
              </div>
            </div>
            <Button variant="outline">Update Password</Button>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg" onClick={handleSave}>{saved ? "Settings Saved!" : "Save All Settings"}</Button>
        </div>
      </div>
    </div>
  )
}
