"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Bell, Shield, Eye, Moon, Globe } from "lucide-react"

export default function SettingsPage() {
  const { user, isAuthenticated, updateUser } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState({ email: true, sms: false, marketing: true, orders: true })
  const [preferences, setPreferences] = useState({ darkMode: false, language: "en", currency: "USD" })
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/settings")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) return null

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/account" className="hover:text-primary">Account</Link>
            <span>/</span>
            <span className="text-foreground">Settings</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle>
              <CardDescription>Choose what notifications you receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div><Label>Email Notifications</Label><p className="text-sm text-muted-foreground">Receive order updates via email</p></div>
                <Switch checked={notifications.email} onCheckedChange={(v) => setNotifications({ ...notifications, email: v })} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><Label>SMS Notifications</Label><p className="text-sm text-muted-foreground">Receive text message alerts</p></div>
                <Switch checked={notifications.sms} onCheckedChange={(v) => setNotifications({ ...notifications, sms: v })} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><Label>Marketing Emails</Label><p className="text-sm text-muted-foreground">Deals, new arrivals, and promotions</p></div>
                <Switch checked={notifications.marketing} onCheckedChange={(v) => setNotifications({ ...notifications, marketing: v })} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><Label>Order Updates</Label><p className="text-sm text-muted-foreground">Shipping and delivery notifications</p></div>
                <Switch checked={notifications.orders} onCheckedChange={(v) => setNotifications({ ...notifications, orders: v })} />
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Privacy</CardTitle>
              <CardDescription>Control your privacy and visibility settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div><Label>Profile Visibility</Label><p className="text-sm text-muted-foreground">Allow others to see your profile</p></div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div><Label>Activity Status</Label><p className="text-sm text-muted-foreground">Show when you&apos;re online</p></div>
                <Switch defaultChecked={false} />
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5" /> Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
              </div>
              <Button onClick={handleSave} disabled={!passwords.current || !passwords.new || passwords.new !== passwords.confirm}>
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" /> Preferences</CardTitle>
              <CardDescription>Customize your shopping experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div><Label>Dark Mode</Label><p className="text-sm text-muted-foreground">Use dark theme across the site</p></div>
                <Switch checked={preferences.darkMode} onCheckedChange={(v) => setPreferences({ ...preferences, darkMode: v })} />
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <select
                    value={preferences.language}
                    onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <select
                    value={preferences.currency}
                    onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg">
              {saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible account actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" size="sm">Delete Account</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
