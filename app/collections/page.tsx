"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { categories } from "@/lib/data"
import Link from "next/link"

const collections = [
  {
    name: "Summer Essentials",
    slug: "summer",
    description: "Lightweight and breathable shoes for warm weather",
    image: "/placeholder.svg",
    itemCount: 8,
  },
  {
    name: "Winter Collection",
    slug: "winter",
    description: "Warm and durable footwear for cold conditions",
    image: "/placeholder.svg",
    itemCount: 6,
  },
  {
    name: "Retro Classics",
    slug: "retro",
    description: "Vintage-inspired silhouettes with modern comfort",
    image: "/placeholder.svg",
    itemCount: 10,
  },
  {
    name: "Performance Series",
    slug: "performance",
    description: "Engineered for peak athletic performance",
    image: "/placeholder.svg",
    itemCount: 7,
  },
  {
    name: "Street Style",
    slug: "street",
    description: "Urban-inspired designs for everyday wear",
    image: "/placeholder.svg",
    itemCount: 12,
  },
  {
    name: "Sustainable Line",
    slug: "sustainable",
    description: "Eco-friendly materials and responsible manufacturing",
    image: "/placeholder.svg",
    itemCount: 5,
  },
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">Collections</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Collections</h1>
          <p className="text-muted-foreground">Curated collections for every style and occasion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {collections.map((collection) => (
            <Card key={collection.slug} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <img src={collection.image} alt={collection.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.description}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{collection.itemCount} items</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/products`}>
                      Shop Now <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`}>
                <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-bold">{cat.name}</h3>
                        <p className="text-sm opacity-90">{cat.count} products</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
