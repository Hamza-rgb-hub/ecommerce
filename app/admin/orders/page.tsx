"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Eye, MoreHorizontal, Filter, Download } from "lucide-react"
import { orders } from "@/lib/data"

function OrderTable({ orderList }: { orderList: typeof orders }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default"
      case "processing": return "secondary"
      case "shipped": return "outline"
      case "pending": return "destructive"
      case "cancelled": return "destructive"
      default: return "secondary"
    }
  }

  if (orderList.length === 0) {
    return <p className="text-muted-foreground py-4 text-center">No orders in this category</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderList.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={order.customer.avatar || "/placeholder.svg"} alt={order.customer.name} />
                  <AvatarFallback>{order.customer.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{order.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-sm">{item.name} (x{item.quantity})</p>
                ))}
              </div>
            </TableCell>
            <TableCell>${order.total.toFixed(2)}</TableCell>
            <TableCell><Badge variant={getStatusColor(order.status)} className="capitalize">{order.status}</Badge></TableCell>
            <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                  <DropdownMenuItem>Update Status</DropdownMenuItem>
                  <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                  <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders
    const s = searchTerm.toLowerCase()
    return orders.filter(
      (o) => o.id.toLowerCase().includes(s) || o.customer.name.toLowerCase().includes(s) || o.customer.email.toLowerCase().includes(s)
    )
  }, [searchTerm])

  const byStatus = (status: string) => filteredOrders.filter((o) => o.status === status)

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Order Management</h1>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export Orders</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">All ({filteredOrders.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({byStatus("pending").length})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({byStatus("processing").length})</TabsTrigger>
            <TabsTrigger value="shipped">Shipped ({byStatus("shipped").length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({byStatus("completed").length})</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
        </div>

        {["all", "pending", "processing", "shipped", "completed"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{tab === "all" ? "All" : tab} Orders ({tab === "all" ? filteredOrders.length : byStatus(tab).length})</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderTable orderList={tab === "all" ? filteredOrders : byStatus(tab)} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
