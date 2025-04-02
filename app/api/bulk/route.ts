import { type NextRequest, NextResponse } from "next/server"
import { generateBulkQRCodes } from "@/lib/qr-generator"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, format = "png", size = 300 } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid parameter: items must be a non-empty array" },
        { status: 400 },
      )
    }

    if (items.length > 100) {
      return NextResponse.json({ error: "Too many items: maximum 100 QR codes per request" }, { status: 400 })
    }

    // Generate bulk QR codes
    const results = await generateBulkQRCodes({
      items,
      format,
      size,
    })

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Bulk QR code generation error:", error)
    return NextResponse.json({ error: "Failed to generate bulk QR codes" }, { status: 500 })
  }
}

