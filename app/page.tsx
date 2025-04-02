import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Palette, Share2, BadgeIcon as IdCard, Package, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blazing Fast QR Code API</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          High-performance QR code generation with advanced customization options, logo support, and real-time
          analytics.
        </p>
      </div>

      <Tabs defaultValue="features" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<QrCode className="h-10 w-10" />}
              title="Blazing Fast Generation"
              description="Optimized performance-first API with minimal latency and in-memory processing."
            />
            <FeatureCard
              icon={<Palette className="h-10 w-10" />}
              title="Custom Design & Styling"
              description="Fully customizable QR codes with colors, gradients, shapes, and patterns."
            />
            <FeatureCard
              icon={<Share2 className="h-10 w-10" />}
              title="QR Codes with Logo"
              description="Add brand logos or images to your QR code with support for multiple formats."
            />
            <FeatureCard
              icon={<IdCard className="h-10 w-10" />}
              title="vCard & Social Media"
              description="Generate QR codes for contact information and social media profiles."
            />
            <FeatureCard
              icon={<Package className="h-10 w-10" />}
              title="Bulk Generation"
              description="Generate multiple QR codes in a single request, optimized for high volume."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10" />}
              title="Real-time Analytics"
              description="Track scan count, device type, and location with high-performance storage."
            />
          </div>
        </TabsContent>

        <TabsContent value="endpoints">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>
                Our RESTful API provides multiple endpoints for different QR code generation needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <EndpointItem
                  method="POST"
                  endpoint="/api/generate"
                  description="Basic QR code generation with minimal parameters"
                />
                <EndpointItem
                  method="POST"
                  endpoint="/api/custom"
                  description="Generate custom-designed QR codes with styling options"
                />
                <EndpointItem
                  method="POST"
                  endpoint="/api/social"
                  description="Create QR codes for social media profiles"
                />
                <EndpointItem
                  method="POST"
                  endpoint="/api/vcard"
                  description="Generate vCard QR codes for contact information"
                />
                <EndpointItem
                  method="POST"
                  endpoint="/api/logo"
                  description="Create QR codes with custom logo images"
                />
                <EndpointItem method="POST" endpoint="/api/bulk" description="Bulk QR code generation for efficiency" />
                <EndpointItem method="GET" endpoint="/api/analytics" description="Retrieve real-time scan analytics" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle>API Usage Examples</CardTitle>
              <CardDescription>Here are some examples of how to use our QR code API.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <CodeExample
                  title="Basic QR Code Generation"
                  code={`fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: 'https://example.com',
    format: 'png',
    size: 300
  })
})`}
                />

                <CodeExample
                  title="Custom QR Code with Gradient"
                  code={`fetch('/api/custom', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: 'https://example.com',
    format: 'svg',
    size: 400,
    cornerStyle: 'rounded',
    dotStyle: 'dots',
    gradient: {
      type: 'linear',
      rotation: 45,
      colorStops: [
        { offset: 0, color: '#FF5757' },
        { offset: 1, color: '#8C52FF' }
      ]
    }
  })
})`}
                />

                <CodeExample
                  title="Social Media QR Code"
                  code={`fetch('/api/social', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    platform: 'instagram',
    username: 'yourusername',
    format: 'png',
    size: 300,
    color: '#E1306C'
  })
})`}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/docs">View Full Documentation</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center">{description}</p>
      </CardContent>
    </Card>
  )
}

function EndpointItem({
  method,
  endpoint,
  description,
}: {
  method: string
  endpoint: string
  description: string
}) {
  return (
    <div className="flex items-start">
      <div className="w-16 text-sm font-semibold bg-primary text-primary-foreground rounded px-2 py-1 text-center mr-4">
        {method}
      </div>
      <div>
        <p className="font-mono text-sm">{endpoint}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function CodeExample({ title, code }: { title: string; code: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  )
}

