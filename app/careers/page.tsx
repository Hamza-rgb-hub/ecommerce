"use client"

import { InfoPageLayout } from "@/components/info-page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, MapPin, Clock } from "lucide-react"
import Link from "next/link"

const openings = [
  { title: "Senior Frontend Developer", department: "Engineering", location: "New York, NY", type: "Full-time" },
  { title: "Product Designer", department: "Design", location: "Remote", type: "Full-time" },
  { title: "Customer Support Specialist", department: "Support", location: "New York, NY", type: "Full-time" },
  { title: "Warehouse Associate", department: "Operations", location: "Newark, NJ", type: "Full-time" },
  { title: "Marketing Coordinator", department: "Marketing", location: "New York, NY", type: "Full-time" },
]

export default function CareersPage() {
  return (
    <InfoPageLayout title="Careers" description="Join the SoleStore team" breadcrumbs={[{ label: "Careers" }]}>
      <div className="space-y-8 not-prose">
        <section className="bg-primary/5 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Come Work With Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We&apos;re always looking for passionate people who love sneakers and want to help us build the best
            shopping experience. We offer competitive pay, great benefits, and a culture that celebrates individuality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          <div className="space-y-4">
            {openings.map((job) => (
              <Card key={job.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.type}</span>
                      </div>
                    </div>
                    <Button asChild><Link href="/contact">Apply</Link></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </InfoPageLayout>
  )
}
