"use client"

import { InfoPageLayout } from "@/components/info-page-layout"
import { Truck, Clock, Globe, Package } from "lucide-react"

export default function ShippingPage() {
  return (
    <InfoPageLayout title="Shipping Information" description="Everything you need to know about shipping" breadcrumbs={[{ label: "Shipping" }]}>
      <div className="space-y-8 not-prose">
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { icon: Truck, title: "Free Standard Shipping", desc: "On all orders over $100. 3-5 business days delivery." },
            { icon: Clock, title: "Express Shipping", desc: "$14.99 for 1-2 business day delivery on any order." },
            { icon: Globe, title: "US Only", desc: "We currently ship within the United States only." },
            { icon: Package, title: "Order Tracking", desc: "Track your package with the tracking number sent via email." },
          ].map((item) => (
            <div key={item.title} className="bg-muted/50 rounded-lg p-6">
              <item.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4">Shipping Rates</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-semibold">Method</th>
                  <th className="text-left py-3 font-semibold">Delivery Time</th>
                  <th className="text-left py-3 font-semibold">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-3">Standard Shipping</td><td className="py-3">3-5 business days</td><td className="py-3">Free over $100 / $9.99</td></tr>
                <tr className="border-b"><td className="py-3">Express Shipping</td><td className="py-3">1-2 business days</td><td className="py-3">$14.99</td></tr>
                <tr><td className="py-3">Next Day</td><td className="py-3">Next business day</td><td className="py-3">$24.99</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Processing Time</h2>
          <p className="text-muted-foreground leading-relaxed">
            Orders placed before 2:00 PM EST on business days are processed the same day. Orders placed after 2:00 PM EST
            or on weekends/holidays are processed the next business day. Processing includes verification, quality check, and packaging.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  )
}
