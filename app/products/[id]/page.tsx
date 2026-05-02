"use client"

import { useState, use } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Heart, ShoppingBag, Truck, RotateCcw, Shield, ChevronLeft, Minus, Plus } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { products, getColorClass } from "@/lib/data"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products.find((p) => p.id === Number.parseInt(id))
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    if (!selectedSize) return
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
      })
    }
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id && p.status !== "draft").slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/products" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" /> Back to Products
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img src={product.images[0] || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                {product.isNew && <Badge>New Arrival</Badge>}
                {product.originalPrice && <Badge variant="destructive">On Sale</Badge>}
                {product.stock === 0 ? (
                  <Badge variant="secondary">Out of Stock</Badge>
                ) : product.stock < 10 ? (
                  <Badge variant="outline">Only {product.stock} left</Badge>
                ) : (
                  <Badge variant="outline" className="text-green-600">In Stock</Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                  <Badge variant="destructive">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF</Badge>
                </>
              )}
            </div>

            <Separator />

            {/* Color Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                Color: <span className="text-muted-foreground capitalize">{selectedColor}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${getColorClass(color)} ${
                      selectedColor === color ? "border-primary ring-2 ring-primary/20" : "border-gray-300"
                    } transition-all`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="text-sm font-medium mb-3 block">
                Size: <span className="text-muted-foreground">{selectedSize || "Select a size"}</span>
              </label>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="h-10"
                  >
                    {size}
                  </Button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-sm text-destructive mt-2">Please select a size</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-3 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)} disabled={quantity >= product.stock}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart & Favorite */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!selectedSize || product.stock === 0}>
                <ShoppingBag className="h-5 w-5 mr-2" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button variant="outline" size="lg" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Over $100</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs font-medium">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">Easy returns</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs font-medium">Authentic</p>
                <p className="text-xs text-muted-foreground">Guaranteed</p>
              </div>
            </div>

            <Separator />

            {/* Tabs */}
            <div>
              <div className="flex gap-6 border-b">
                {["description", "details", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="pt-4">
                {activeTab === "description" && <p className="text-muted-foreground leading-relaxed">{product.description}</p>}
                {activeTab === "details" && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Brand</span><span>{product.brand}</span></div>
                    <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Category</span><span>{product.category}</span></div>
                    <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Gender</span><span className="capitalize">{product.gender}</span></div>
                    <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Available Sizes</span><span>{product.sizes.length} sizes</span></div>
                    <div className="flex justify-between py-2 border-b"><span className="text-muted-foreground">Available Colors</span><span>{product.colors.length} colors</span></div>
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-4xl font-bold">{product.rating}</p>
                        <div className="flex items-center gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`h-4 w-4 ${s <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{product.reviews} reviews</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Customer reviews will appear here once available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Card key={p.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <Link href={`/products/${p.id}`}>
                      <div className="relative aspect-square overflow-hidden">
                        <img src={p.images[0] || "/placeholder.svg"} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        {p.isNew && <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">New</Badge>}
                        {p.originalPrice && <Badge variant="destructive" className="absolute top-3 left-3 mt-8">Sale</Badge>}
                      </div>
                    </Link>
                    <div className="p-4 space-y-2">
                      <p className="text-sm text-muted-foreground">{p.brand}</p>
                      <Link href={`/products/${p.id}`}>
                        <h3 className="font-semibold hover:text-primary transition-colors">{p.name}</h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">${p.price}</span>
                        {p.originalPrice && <span className="text-sm text-muted-foreground line-through">${p.originalPrice}</span>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
