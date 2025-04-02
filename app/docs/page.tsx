import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight mb-4">API Documentation</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Comprehensive documentation for the QR Code Generation API.
        </p>
      </div>

      <Tabs defaultValue="generate" className="max-w-4xl">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-8">
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="vcard">vCard</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="bulk">Bulk</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="generate">
          <EndpointDocs
            title="Basic QR Code Generation"
            endpoint="/api/generate"
            method="POST"
            description="Generate a basic QR code with minimal configuration."
            requestParams={[
              { name: "data", type: "string", required: true, description: "The data to encode in the QR code" },
              {
                name: "format",
                type: "string",
                required: false,
                description: "Output format (png, svg, pdf, eps). Default: png",
              },
              {
                name: "size",
                type: "number",
                required: false,
                description: "Size of the QR code in pixels. Default: 300",
              },
              {
                name: "errorCorrectionLevel",
                type: "string",
                required: false,
                description: "Error correction level (L, M, Q, H). Default: M",
              },
            ]}
            responseExample={`
// Binary response with appropriate Content-Type header
// Example: image/png, image/svg+xml, application/pdf, etc.
`}
          />
        </TabsContent>

        <TabsContent value="custom">
          <EndpointDocs
            title="Custom QR Code Generation"
            endpoint="/api/custom"
            method="POST"
            description="Generate a QR code with custom styling options."
            requestParams={[
              { name: "data", type: "string", required: true, description: "The data to encode in the QR code" },
              {
                name: "format",
                type: "string",
                required: false,
                description: "Output format (png, svg, pdf, eps). Default: png",
              },
              {
                name: "size",
                type: "number",
                required: false,
                description: "Size of the QR code in pixels. Default: 300",
              },
              {
                name: "color",
                type: "string",
                required: false,
                description: "Color of the QR code dots. Default: #000000",
              },
              {
                name: "backgroundColor",
                type: "string",
                required: false,
                description: "Background color. Default: #FFFFFF",
              },
              {
                name: "cornerStyle",
                type: "string",
                required: false,
                description: "Corner style (square, rounded, dot). Default: square",
              },
              {
                name: "dotStyle",
                type: "string",
                required: false,
                description: "Dot style (square, rounded, dot). Default: square",
              },
              {
                name: "errorCorrectionLevel",
                type: "string",
                required: false,
                description: "Error correction level (L, M, Q, H). Default: M",
              },
              { name: "gradient", type: "object", required: false, description: "Gradient configuration for dots" },
            ]}
            responseExample={`
// Binary response with appropriate Content-Type header
// Example: image/png, image/svg+xml, application/pdf, etc.
`}
          />
        </TabsContent>

        <TabsContent value="social">
          <EndpointDocs
            title="Social Media QR Code Generation"
            endpoint="/api/social"
            method="POST"
            description="Generate a QR code for social media profiles."
            requestParams={[
              {
                name: "platform",
                type: "string",
                required: true,
                description:
                  "Social media platform (facebook, youtube, twitter, instagram, linkedin, whatsapp, telegram, snapchat)",
              },
              {
                name: "username",
                type: "string",
                required: true,
                description: "Username or ID for the social media platform",
              },
              {
                name: "format",
                type: "string",
                required: false,
                description: "Output format (png, svg, pdf, eps). Default: png",
              },
              {
                name: "size",
                type: "number",
                required: false,
                description: "Size of the QR code in pixels. Default: 300",
              },
              {
                name: "color",
                type: "string",
                required: false,
                description: "Color of the QR code dots. Default: #000000",
              },
              {
                name: "backgroundColor",
                type: "string",
                required: false,
                description: "Background color. Default: #FFFFFF",
              },
            ]}
            responseExample={`
// Binary response with appropriate Content-Type header
// Example: image/png, image/svg+xml, application/pdf, etc.
`}
          />
        </TabsContent>

        <TabsContent value="vcard">
          <EndpointDocs
            title="vCard QR Code Generation"
            endpoint="/api/vcard"
            method="POST"
            description="Generate a QR code containing contact information in vCard format."
            requestParams={[
              { name: "name", type: "string", required: true, description: "Full name of the contact" },
              { name: "phone", type: "string", required: false, description: "Phone number" },
              { name: "email", type: "string", required: false, description: "Email address" },
              { name: "address", type: "string", required: false, description: "Physical address" },
              { name: "company", type: "string", required: false, description: "Company or organization" },
              { name: "website", type: "string", required: false, description: "Website URL" },
              {
                name: "format",
                type: "string",
                required: false,
                description: "Output format (png, svg, pdf, eps). Default: png",
              },
              {
                name: "size",
                type: "number",
                required: false,
                description: "Size of the QR code in pixels. Default: 300",
              },
              {
                name: "color",
                type: "string",
                required: false,
                description: "Color of the QR code dots. Default: #000000",
              },
              {
                name: "backgroundColor",
                type: "string",
                required: false,
                description: "Background color. Default: #FFFFFF",
              },
            ]}
            responseExample={`
// Binary response with appropriate Content-Type header
// Example: image/png, image/svg+xml, application/pdf, etc.
`}
          />
        </TabsContent>

        <TabsContent value="logo">
          <EndpointDocs
            title="QR Code with Logo"
            endpoint="/api/logo"
            method="POST"
            description="Generate a QR code with a custom logo in the center."
            requestParams={[
              { name: "data", type: "string", required: true, description: "The data to encode in the QR code" },
              { name: "logo", type: "file", required: true, description: "Logo image file (PNG, JPG, SVG, WebP)" },
              {
                name: "format",
                type: "string",
                required: false,
                description: "Output format (png, svg, pdf, eps). Default: png",
              },
              {
                name: "size",
                type: "number",
                required: false,
                description: "Size of the QR code in pixels. Default: 300",
              },
            ]}
            responseExample={`
// Binary response with appropriate Content-Type header
// Example: image/png, image/svg+xml, application/pdf, etc.
`}
            notes="This endpoint requires a multipart/form-data request with the logo file."
          />
        </TabsContent>

        <TabsContent value="bulk">
          <EndpointDocs
            title="Bulk QR Code Generation"
            endpoint="/api/bulk"
            method="POST"
            description="Generate multiple QR codes in a single request."
            requestParams={[
              { name: "items", type: "array", required: true, description: "Array of QR code configurations" },
              {
                name: "format",
                type: "string",
                required: false,
                description: "Default output format for all QR codes. Default: png",
              },
              {
                name: "size",
                type: "number",
                required: false,
                description: "Default size for all QR codes. Default: 300",
              },
            ]}
            responseExample={`
{
  "results": [
    {
      "id": "abc123xyz",
      "data": "https://example.com",
      "type": "basic",
      "format": "png",
      "contentType": "image/png",
      "base64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
    },
    {
      "id": "def456uvw",
      "data": "https://another-example.com",
      "type": "custom",
      "format": "svg",
      "contentType": "image/svg+xml",
      "base64": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0i..."
    }
  ]
}
`}
            notes="Limited to 100 QR codes per request. Each item in the items array should contain the parameters specific to the QR code type."
          />
        </TabsContent>

        <TabsContent value="analytics">
          <EndpointDocs
            title="QR Code Analytics"
            endpoint="/api/analytics"
            method="GET"
            description="Retrieve analytics data for a specific QR code."
            requestParams={[
              { name: "id", type: "string", required: true, description: "The QR code ID to get analytics for" },
              {
                name: "startDate",
                type: "string",
                required: false,
                description: "Start date for analytics (ISO format)",
              },
              { name: "endDate", type: "string", required: false, description: "End date for analytics (ISO format)" },
            ]}
            responseExample={`
{
  "qrId": "abc123xyz",
  "totalScans": 157,
  "deviceTypes": {
    "mobile": 98,
    "desktop": 52,
    "tablet": 7
  },
  "locations": {
    "US": 64,
    "UK": 23,
    "DE": 18,
    "FR": 12,
    "other": 40
  },
  "scansByDay": {
    "2023-04-01": 12,
    "2023-04-02": 15,
    "2023-04-03": 8
  },
  "timeRange": {
    "start": "2023-04-01T00:00:00.000Z",
    "end": "2023-04-03T23:59:59.999Z"
  }
}
`}
          />

          <div className="mt-8">
            <EndpointDocs
              title="Record QR Code Scan"
              endpoint="/api/analytics"
              method="POST"
              description="Record a scan event for a QR code."
              requestParams={[
                { name: "qrId", type: "string", required: true, description: "The QR code ID that was scanned" },
                {
                  name: "deviceType",
                  type: "string",
                  required: false,
                  description: "Type of device that scanned the code",
                },
                { name: "location", type: "string", required: false, description: "Location where the scan occurred" },
              ]}
              responseExample={`
{
  "success": true
}
`}
            />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}

function EndpointDocs({
  title,
  endpoint,
  method,
  description,
  requestParams,
  responseExample,
  notes,
}: {
  title: string
  endpoint: string
  method: string
  description: string
  requestParams: Array<{
    name: string
    type: string
    required: boolean
    description: string
  }>
  responseExample: string
  notes?: string
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="text-sm font-semibold bg-primary text-primary-foreground rounded px-2 py-1 w-16 text-center">
            {method}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>
          <span className="font-mono">{endpoint}</span>
        </CardDescription>
        <p className="mt-2">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Request Parameters</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Required</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requestParams.map((param) => (
                  <TableRow key={param.name}>
                    <TableCell className="font-mono">{param.name}</TableCell>
                    <TableCell>{param.type}</TableCell>
                    <TableCell>{param.required ? "Yes" : "No"}</TableCell>
                    <TableCell>{param.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Response</h3>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
              <code>{responseExample}</code>
            </pre>
          </div>

          {notes && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Notes</h3>
              <p>{notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

