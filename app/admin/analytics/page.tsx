"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Eye } from "lucide-react"
import { orders, products } from "@/lib/data"
import { useState } from "react"

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState("30d")

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const totalOrders = orders.length
  const avgOrderValue = totalRevenue / totalOrders
  const conversionRate = 3.2

  const topProducts = products
    .filter((p) => p.status === "active")
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 5)

  const salesData = [
    { month: "Aug", revenue: 12500 },
    { month: "Sep", revenue: 15200 },
    { month: "Oct", revenue: 18900 },
    { month: "Nov", revenue: 22100 },
    { month: "Dec", revenue: 25800 },
    { month: "Jan", revenue: 28400 },
  ]

  const maxRevenue = Math.max(...salesData.map((d) => d.revenue))

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Track your store performance</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Revenue", value: `$${totalRevenue.toFixed(2)}`, change: "+20.1%", trend: "up", icon: DollarSign, color: "text-green-500" },
          { title: "Orders", value: totalOrders.toString(), change: "+81.1%", trend: "up", icon: ShoppingBag, color: "text-blue-500" },
          { title: "Avg Order Value", value: `$${avgOrderValue.toFixed(2)}`, change: "+8.7%", trend: "up", icon: Eye, color: "text-purple-500" },
          { title: "Conversion Rate", value: `${conversionRate}%`, change: "+14.3%", trend: "up", icon: Users, color: "text-orange-500" },
        ].map((metric) => (
          <Card key={metric.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <p className="text-2xl font-bold">{metric.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={`text-xs font-medium ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {metric.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {salesData.map((d) => (
              <div key={d.month} className="flex items-center gap-4">
                <span className="w-8 text-sm text-muted-foreground">{d.month}</span>
                <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(d.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="w-20 text-sm font-medium text-right">${d.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, idx) => (
                <div key={product.id} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-muted-foreground w-6">#{idx + 1}</span>
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img src={product.images[0] || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{product.reviews} reviews</p>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">{product.rating} ★</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["completed", "processing", "shipped", "pending"].map((status) => {
                const count = orders.filter((o) => o.status === status).length
                const percentage = totalOrders > 0 ? (count / totalOrders) * 100 : 0
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm capitalize">{status}</span>
                      <span className="text-sm font-medium">{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          status === "completed" ? "bg-green-500" : status === "processing" ? "bg-blue-500" : status === "shipped" ? "bg-purple-500" : "bg-yellow-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
