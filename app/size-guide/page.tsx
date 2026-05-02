"use client"

import { InfoPageLayout } from "@/components/info-page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ruler } from "lucide-react"

const usSizes = [
  { us: "7", uk: "6", eu: "40", cm: "25" },
  { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.5" },
  { us: "8", uk: "7", eu: "41", cm: "26" },
  { us: "8.5", uk: "7.5", eu: "42", cm: "26.5" },
  { us: "9", uk: "8", eu: "42.5", cm: "27" },
  { us: "9.5", uk: "8.5", eu: "43", cm: "27.5" },
  { us: "10", uk: "9", eu: "44", cm: "28" },
  { us: "10.5", uk: "9.5", eu: "44.5", cm: "28.5" },
  { us: "11", uk: "10", eu: "45", cm: "29" },
  { us: "11.5", uk: "10.5", eu: "45.5", cm: "29.5" },
  { us: "12", uk: "11", eu: "46", cm: "30" },
]

export default function SizeGuidePage() {
  return (
    <InfoPageLayout title="Size Guide" description="Find your perfect fit" breadcrumbs={[{ label: "Size Guide" }]}>
      <div className="space-y-8 not-prose">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Ruler className="h-5 w-5" /> How to Measure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Place a piece of paper against a wall</li>
              <li>Stand on the paper with your heel against the wall</li>
              <li>Mark the longest part of your foot on the paper</li>
              <li>Measure the distance from the edge of the paper to the mark</li>
              <li>Use the measurement in centimeters to find your size below</li>
            </ol>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-bold mb-4">Men&apos;s Size Chart</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-3 px-4 font-semibold">US</th>
                  <th className="text-left py-3 px-4 font-semibold">UK</th>
                  <th className="text-left py-3 px-4 font-semibold">EU</th>
                  <th className="text-left py-3 px-4 font-semibold">CM</th>
                </tr>
              </thead>
              <tbody>
                {usSizes.map((size) => (
                  <tr key={size.us} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-4 font-medium">{size.us}</td>
                    <td className="py-3 px-4">{size.uk}</td>
                    <td className="py-3 px-4">{size.eu}</td>
                    <td className="py-3 px-4">{size.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Tips for the Best Fit</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Measure at End of Day", desc: "Your feet swell throughout the day, so measure in the evening for the best fit." },
              { title: "Wear Socks", desc: "Measure with the type of socks you plan to wear with the shoes." },
              { title: "Measure Both Feet", desc: "Most people have one foot slightly larger. Size to the larger foot." },
              { title: "Leave Room", desc: "There should be about a thumb's width of space between your longest toe and the shoe end." },
            ].map((tip) => (
              <div key={tip.title} className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-medium mb-1">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </InfoPageLayout>
  )
}
