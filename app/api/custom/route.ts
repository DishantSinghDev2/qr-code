import { type NextRequest, NextResponse } from "next/server"
import { generateCustomQRCode } from "@/lib/qr-generator"
import { cacheManager } from "@/lib/cache-manager"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      data,
      format = "png",
      size = 300,
      color = "#000000",
      backgroundColor = "#FFFFFF",
      cornerStyle = "square",
      dotStyle = "square",
      errorCorrectionLevel = "M",
      gradient = null,
    } = body

    if (!data) {
      return NextResponse.json({ error: "Missing required parameter: data" }, { status: 400 })
    }

    // Generate a unique cache key based on all parameters
    const cacheKey = `custom-qr-${JSON.stringify(body)}`
    const cachedQR = cacheManager.get(cacheKey)

    if (cachedQR) {
      return new NextResponse(cachedQR.buffer, {
        headers: {
          "Content-Type": cachedQR.contentType,
          "Cache-Control": "public, max-age=86400",
        },
      })
    }

    // Generate custom QR code
    const { buffer, contentType } = await generateCustomQRCode({
      data,
      format,
      size,
      color,
      backgroundColor,
      cornerStyle,
      dotStyle,
      errorCorrectionLevel,
      gradient,
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
    console.error("Custom QR code generation error:", error)
    return NextResponse.json({ error: "Failed to generate custom QR code" }, { status: 500 })
  }
}

