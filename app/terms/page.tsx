"use client"

import { InfoPageLayout } from "@/components/info-page-layout"

export default function TermsPage() {
  return (
    <InfoPageLayout title="Terms of Service" description="Our terms and conditions" breadcrumbs={[{ label: "Terms" }]}>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>Last updated: January 1, 2024</p>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using SoleStore, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">2. Account Responsibility</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">3. Purchases</h2>
          <p>All purchases are subject to product availability. We reserve the right to limit quantities. Prices are subject to change without notice. Payment is processed at the time of order placement.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">4. Returns & Refunds</h2>
          <p>Returns are accepted within 30 days of delivery for unworn items in original packaging. Refunds are processed to the original payment method within 5-7 business days.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">5. Intellectual Property</h2>
          <p>All content on this site, including text, graphics, logos, and images, is the property of SoleStore or its content suppliers and is protected by intellectual property laws.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">6. Limitation of Liability</h2>
          <p>SoleStore shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
        </section>
      </div>
    </InfoPageLayout>
  )
}
