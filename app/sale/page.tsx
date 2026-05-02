"use client"

import { useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { products } from "@/lib/data"
import Link from "next/link"

export default function SalePage() {
  const saleProducts = useMemo(() => products.filter((p) => p.originalPrice && p.status !== "draft"), [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">Sale</span>
          </div>
          <div className="bg-destructive/10 rounded-xl p-8 mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Sale — Up to 20% Off</h1>
            <p className="text-muted-foreground text-lg">Limited time deals on select styles. Don&apos;t miss out!</p>
          </div>
        </div>
        <ProductGrid products={saleProducts} emptyMessage="No items on sale right now" emptyDescription="Check back soon for new deals" />
      </main>
      <Footer />
    </div>
  )
}
