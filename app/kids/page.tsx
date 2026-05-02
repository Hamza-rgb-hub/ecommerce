"use client"

import { useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { products } from "@/lib/data"
import Link from "next/link"

export default function KidsPage() {
  const kidsProducts = useMemo(() => products.filter((p) => (p.gender === "kids" || p.gender === "unisex") && p.status !== "draft"), [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">Kids</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Kids&apos; Shoes</h1>
          <p className="text-muted-foreground">Fun and comfortable shoes for active kids</p>
        </div>
        <ProductGrid products={kidsProducts} emptyMessage="No kids' shoes available" />
      </main>
      <Footer />
    </div>
  )
}
