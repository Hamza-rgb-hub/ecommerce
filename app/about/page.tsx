"use client"

import { InfoPageLayout } from "@/components/info-page-layout"

export default function AboutPage() {
  return (
    <InfoPageLayout title="About SoleStore" description="Our story and mission" breadcrumbs={[{ label: "About" }]}>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            Founded in 2020, SoleStore was born from a passion for sneakers and a frustration with the limited options available
            for authentic, quality footwear. What started as a small online shop has grown into one of the most trusted
            destinations for sneaker enthusiasts worldwide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe everyone deserves access to authentic, high-quality footwear at fair prices. Our mission is to curate the
            best selection of sneakers from top brands and deliver them with exceptional service, making the shopping experience
            as enjoyable as wearing the shoes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">What Sets Us Apart</h2>
          <div className="grid sm:grid-cols-2 gap-6 not-prose">
            {[
              { title: "Authenticity Guaranteed", desc: "Every product is verified authentic. We source directly from brands and authorized retailers." },
              { title: "Curated Selection", desc: "Our team hand-picks every style, ensuring only the best makes it to our shelves." },
              { title: "Expert Customer Service", desc: "Our sneaker-obsessed team is here to help you find the perfect pair." },
              { title: "Fast & Free Shipping", desc: "Free shipping on orders over $100 with hassle-free 30-day returns." },
            ].map((item) => (
              <div key={item.title} className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">By the Numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 not-prose">
            {[
              { value: "50K+", label: "Happy Customers" },
              { value: "1,200+", label: "Products" },
              { value: "30+", label: "Brands" },
              { value: "99%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </InfoPageLayout>
  )
}
