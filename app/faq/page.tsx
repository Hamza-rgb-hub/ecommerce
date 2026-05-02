"use client"

import { InfoPageLayout } from "@/components/info-page-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

const faqs = [
  { category: "Orders", items: [
    { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking number via email. You can also find it in your order history on the Orders page." },
    { q: "Can I cancel my order?", a: "You can cancel your order within 1 hour of placing it. After that, cancellation is not possible as we begin processing immediately." },
    { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee." },
    { q: "Do you ship internationally?", a: "Currently, we ship within the United States only. International shipping is coming soon." },
  ]},
  { category: "Returns & Exchanges", items: [
    { q: "What is your return policy?", a: "We offer a 30-day return policy. Items must be unworn, in original packaging with all tags attached." },
    { q: "How do I start a return?", a: "Go to your Orders page, find the order, and click 'Return Item'. You'll receive a prepaid shipping label via email." },
    { q: "How long do refunds take?", a: "Refunds are processed within 5-7 business days after we receive the returned item." },
    { q: "Can I exchange for a different size?", a: "Yes! Place a new order for the correct size and return the original. We'll refund the first order upon receipt." },
  ]},
  { category: "Products", items: [
    { q: "Are your products authentic?", a: "Absolutely. We source directly from brands and authorized retailers. Every product comes with an authenticity guarantee." },
    { q: "How do I find my shoe size?", a: "Check our Size Guide page for detailed measurement instructions and brand-specific sizing charts." },
    { q: "Do you restock sold-out items?", a: "We restock popular items regularly. Sign up for notifications on the product page to be alerted when it's back." },
  ]},
  { category: "Account", items: [
    { q: "How do I reset my password?", a: "Click 'Forgot Password' on the login page and follow the email instructions to reset your password." },
    { q: "Can I change my email address?", a: "Yes, go to Account > Profile to update your email address." },
    { q: "How do I delete my account?", a: "Go to Settings > Danger Zone to delete your account. This action is permanent and cannot be undone." },
  ]},
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFaqs = searchTerm
    ? faqs.map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) => item.q.toLowerCase().includes(searchTerm.toLowerCase()) || item.a.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      })).filter((cat) => cat.items.length > 0)
    : faqs

  return (
    <InfoPageLayout title="FAQ" description="Frequently asked questions" breadcrumbs={[{ label: "FAQ" }]}>
      <div className="mb-8 not-prose">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search questions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="space-y-8 not-prose">
        {filteredFaqs.map((category) => (
          <div key={category.category}>
            <h2 className="text-xl font-bold mb-4">{category.category}</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {category.items.map((item, idx) => (
                <AccordionItem key={idx} value={`${category.category}-${idx}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
        {filteredFaqs.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No results found. Try a different search term.</p>
        )}
      </div>
    </InfoPageLayout>
  )
}
