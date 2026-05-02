"use client"

import { InfoPageLayout } from "@/components/info-page-layout"

export default function PrivacyPage() {
  return (
    <InfoPageLayout title="Privacy Policy" description="How we protect your data" breadcrumbs={[{ label: "Privacy Policy" }]}>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>Last updated: January 1, 2024</p>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">1. Information We Collect</h2>
          <p>We collect information you provide directly, such as your name, email, shipping address, and payment details when you make a purchase or create an account. We also collect usage data automatically, including pages visited, time spent, and device information.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">2. How We Use Your Information</h2>
          <p>Your information is used to process orders, provide customer support, personalize your shopping experience, send order updates, and improve our services. We never sell your personal data to third parties.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">3. Data Security</h2>
          <p>We implement industry-standard security measures including SSL encryption, secure payment processing, and regular security audits to protect your personal information.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">4. Cookies</h2>
          <p>We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can manage cookie preferences through your browser settings.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-3">5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. You can also opt out of marketing communications at any time. Contact us at privacy@solestore.com for any data-related requests.</p>
        </section>
      </div>
    </InfoPageLayout>
  )
}
