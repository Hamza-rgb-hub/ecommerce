"use client"

import { InfoPageLayout } from "@/components/info-page-layout"
import { RotateCcw, Shield, Clock, Package } from "lucide-react"

export default function ReturnsPage() {
  return (
    <InfoPageLayout title="Returns & Exchanges" description="Our hassle-free return policy" breadcrumbs={[{ label: "Returns" }]}>
      <div className="space-y-8 not-prose">
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: RotateCcw, title: "30-Day Returns", desc: "Return any unworn item within 30 days of delivery for a full refund." },
            { icon: Shield, title: "Free Return Shipping", desc: "We provide prepaid shipping labels for all returns." },
            { icon: Clock, title: "5-7 Day Refund", desc: "Refunds are processed within 5-7 business days after we receive your return." },
            { icon: Package, title: "Original Packaging", desc: "Items must be returned in original packaging with all tags attached." },
          ].map((item) => (
            <div key={item.title} className="bg-muted/50 rounded-lg p-6">
              <item.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Return</h2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li>Go to your <strong className="text-foreground">Orders</strong> page and find the order</li>
            <li>Click <strong className="text-foreground">Return Item</strong> and select the reason</li>
            <li>Print the prepaid <strong className="text-foreground">shipping label</strong> sent to your email</li>
            <li>Pack the item securely in its original packaging</li>
            <li>Drop off the package at any authorized shipping location</li>
            <li>Receive your <strong className="text-foreground">refund</strong> within 5-7 business days</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
          <p className="text-muted-foreground leading-relaxed">
            Need a different size or color? The fastest way is to place a new order for the item you want and return the original.
            We&apos;ll process your refund as soon as we receive the returned item. This way, you don&apos;t have to wait for
            the exchange process to get your new shoes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Non-Returnable Items</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Items worn, washed, or altered in any way</li>
            <li>Items without original packaging or tags</li>
            <li>Items returned after the 30-day window</li>
            <li>Final sale items (clearly marked at purchase)</li>
          </ul>
        </section>
      </div>
    </InfoPageLayout>
  )
}
