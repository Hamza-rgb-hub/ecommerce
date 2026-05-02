"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Heart, ShoppingBag, Star, SlidersHorizontal, X, Grid3X3, List } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { ProductQuickView } from "@/components/product-quick-view"
import { products, brands, categories, getColorClass } from "@/lib/data"
import type { Product } from "@/lib/data"
import Link from "next/link"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [favorites, setFavorites] = useState<number[]>([])
  const { addItem } = useCart()
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")
  const [selectedGender, setSelectedGender] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [inStockOnly, setInStockOnly] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => p.status !== "draft")

    if (searchTerm) {
      const s = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s) || p.category.toLowerCase().includes(s)
      )
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category.toLowerCase() === selectedCategory)
    }
    if (selectedBrand !== "all") {
      filtered = filtered.filter((p) => p.brand === selectedBrand)
    }
    if (selectedGender !== "all") {
      filtered = filtered.filter((p) => p.gender === selectedGender || p.gender === "unisex")
    }
    if (inStockOnly) {
      filtered = filtered.filter((p) => p.stock > 0)
    }
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedBrand, selectedGender, priceRange, sortBy, inStockOnly])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]))
  }

  const activeFilterCount = [
    selectedCategory !== "all",
    selectedBrand !== "all",
    selectedGender !== "all",
    inStockOnly,
    priceRange[0] > 0 || priceRange[1] < 200,
  ].filter(Boolean).length

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedBrand("all")
    setSelectedGender("all")
    setPriceRange([0, 200])
    setInStockOnly(false)
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">{filteredProducts.length} products found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`block text-sm w-full text-left py-1 ${selectedCategory === "all" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`block text-sm w-full text-left py-1 ${selectedCategory === cat.slug ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Brand</h3>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Gender</h3>
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Price Range: ${priceRange[0]} - ${priceRange[1]}</h3>
                <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={10} className="mt-2" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="inStock" checked={inStockOnly} onCheckedChange={(v) => setInStockOnly(!!v)} />
                <label htmlFor="inStock" className="text-sm">In Stock Only</label>
              </div>

              {activeFilterCount > 0 && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                  <X className="h-4 w-4 mr-2" /> Clear Filters ({activeFilterCount})
                </Button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="sm:w-64"
                  />
                </div>
                <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                  <SlidersHorizontal className="h-4 w-4" />
                  {activeFilterCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="Sort by" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}>
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <Card className="mb-6 lg:hidden">
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.slug} value={cat.slug}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Brand</label>
                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Brands</SelectItem>
                        {brands.map((b) => (
                          <SelectItem key={b} value={b}>{b}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Gender</label>
                    <Select value={selectedGender} onValueChange={setSelectedGender}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="men">Men</SelectItem>
                        <SelectItem value="women">Women</SelectItem>
                        <SelectItem value="kids">Kids</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="inStockMobile" checked={inStockOnly} onCheckedChange={(v) => setInStockOnly(!!v)} />
                    <label htmlFor="inStockMobile" className="text-sm">In Stock Only</label>
                  </div>
                  {activeFilterCount > 0 && (
                    <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                      <X className="h-4 w-4 mr-2" /> Clear Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Product Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No products found</h2>
                <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
                <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <Link href={`/products/${product.id}`}>
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                            {product.originalPrice && <Badge variant="destructive">Sale</Badge>}
                            {product.stock === 0 && <Badge variant="secondary">Out of Stock</Badge>}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                            onClick={(e) => { e.preventDefault(); toggleFavorite(product.id) }}
                          >
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
                          {product.colors.length > 4 && <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                            )}
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
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Link href={`/products/${product.id}`}>
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img src={product.images[0] || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                        </Link>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm text-muted-foreground">{product.brand}</p>
                              <Link href={`/products/${product.id}`}>
                                <h3 className="font-semibold text-lg hover:text-primary transition-colors">{product.name}</h3>
                              </Link>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => toggleFavorite(product.id)}>
                              <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 hidden sm:block">{product.description}</p>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-sm text-muted-foreground">({product.reviews})</span>
                            {product.isNew && <Badge className="text-xs">New</Badge>}
                            {product.originalPrice && <Badge variant="destructive" className="text-xs">Sale</Badge>}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">${product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                              )}
                            </div>
                            <Button size="sm" disabled={product.stock === 0} onClick={() => setQuickViewProduct(product)}>
                              <ShoppingBag className="h-4 w-4 mr-1" /> Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(item) => { addItem(item); setQuickViewProduct(null) }}
        />
      )}
    </div>
  )
}
