import { type NextRequest, NextResponse } from "next/server"
import { generateQRCode } from "@/lib/qr-generator"
import { cacheManager } from "@/lib/cache-manager"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, format = "png", size = 300 } = body

    if (!data) {
      return NextResponse.json({ error: "Missing required parameter: data" }, { status: 400 })
    }

    // Check cache first
    const cacheKey = `qr-${data}-${format}-${size}`
    const cachedQR = cacheManager.get(cacheKey)

    if (cachedQR) {
      return new NextResponse(cachedQR.buffer, {
        headers: {
          "Content-Type": cachedQR.contentType,
          "Cache-Control": "public, max-age=86400",
        },
      })
    }

    // Generate QR code
    const { buffer, contentType } = await generateQRCode({
      data,
      format,
      size,
      errorCorrectionLevel: "M",
    })

    // Cache the result
    cacheManager.set(cacheKey, { buffer, contentType })

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch (error) {
    console.error("QR code generation error:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}

