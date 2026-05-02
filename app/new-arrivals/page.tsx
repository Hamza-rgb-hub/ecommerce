"use client"

import { useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { products } from "@/lib/data"
import Link from "next/link"

export default function NewArrivalsPage() {
  const newProducts = useMemo(() => products.filter((p) => p.isNew && p.status !== "draft"), [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">New Arrivals</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">New Arrivals</h1>
          <p className="text-muted-foreground">The latest drops and freshest styles</p>
        </div>
        <ProductGrid products={newProducts} emptyMessage="No new arrivals yet" />
      </main>
      <Footer />
    </div>
  )
}
