"use client"

import { useState, useMemo, use } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingBag, Heart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { ProductQuickView } from "@/components/product-quick-view"
import { products, categories, getColorClass } from "@/lib/data"
import type { Product } from "@/lib/data"
import Link from "next/link"

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const category = categories.find((c) => c.slug === slug)
  const [favorites, setFavorites] = useState<number[]>([])
  const { addItem } = useCart()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category.toLowerCase() === slug && p.status !== "draft")
  }, [slug])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-foreground">{category?.name || slug}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{category?.name || slug} Shoes</h1>
          <p className="text-muted-foreground">{category?.description || `Browse our collection of ${slug} shoes`}</p>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No products in this category</h2>
            <p className="text-muted-foreground mb-4">Check back soon for new arrivals</p>
            <Button asChild><Link href="/products">Browse All Products</Link></Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden">
                      <img src={product.images[0] || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                        {product.originalPrice && <Badge variant="destructive">Sale</Badge>}
                      </div>
                      <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80 hover:bg-white" onClick={(e) => { e.preventDefault(); toggleFavorite(product.id) }}>
                        <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                      </Button>
                    </div>
                  </Link>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg leading-tight hover:text-primary transition-colors">{product.name}</h3>
                      </Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.colors.slice(0, 4).map((color) => (
                        <div key={color} className={`w-4 h-4 rounded-full border-2 border-gray-300 ${getColorClass(color)}`} />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">${product.price}</span>
                        {product.originalPrice && <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>}
                      </div>
                      <Button size="sm" disabled={product.stock === 0} onClick={() => setQuickViewProduct(product)}>
                        <ShoppingBag className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
      {quickViewProduct && (
        <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToCart={(item) => { addItem(item); setQuickViewProduct(null) }} />
      )}
    </div>
  )
}
