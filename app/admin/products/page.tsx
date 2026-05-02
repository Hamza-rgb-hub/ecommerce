"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, Edit, Trash2, MoreHorizontal, Filter } from "lucide-react"
import { products } from "@/lib/data"

function ProductTable({ productList }: { productList: typeof products }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default"
      case "out_of_stock": return "destructive"
      case "draft": return "secondary"
      default: return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active"
      case "out_of_stock": return "Out of Stock"
      case "draft": return "Draft"
      default: return status
    }
  }

  if (productList.length === 0) {
    return <p className="text-muted-foreground py-4 text-center">No products in this category</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productList.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted">
                  <img src={product.images[0] || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell><Badge variant={getStatusColor(product.status)}>{getStatusText(product.status)}</Badge></TableCell>
            <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products
    const s = searchTerm.toLowerCase()
    return products.filter(
      (p) => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s) || p.category.toLowerCase().includes(s)
    )
  }, [searchTerm])

  const byStatus = (status: string) => filteredProducts.filter((p) => p.status === status)

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product Management</h1>
          <p className="text-muted-foreground">Manage your store inventory and product catalog</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Add Product</Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="all">All ({filteredProducts.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({byStatus("active").length})</TabsTrigger>
            <TabsTrigger value="out_of_stock">Out of Stock ({byStatus("out_of_stock").length})</TabsTrigger>
            <TabsTrigger value="draft">Draft ({byStatus("draft").length})</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
        </div>

        {["all", "active", "out_of_stock", "draft"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle>{tab === "all" ? "All" : tab === "out_of_stock" ? "Out of Stock" : tab.charAt(0).toUpperCase() + tab.slice(1)} Products ({tab === "all" ? filteredProducts.length : byStatus(tab).length})</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductTable productList={tab === "all" ? filteredProducts : byStatus(tab)} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
