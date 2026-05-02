"use client"

import { useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { products } from "@/lib/data"
import Link from "next/link"

export default function WomenPage() {
  const womenProducts = useMemo(() => products.filter((p) => (p.gender === "women" || p.gender === "unisex") && p.status !== "draft"), [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">Women</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Women&apos;s Shoes</h1>
          <p className="text-muted-foreground">Discover our collection of women&apos;s sneakers and athletic footwear</p>
        </div>
        <ProductGrid products={womenProducts} emptyMessage="No women's shoes available" />
      </main>
      <Footer />
    </div>
  )
}
