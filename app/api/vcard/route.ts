import { type NextRequest, NextResponse } from "next/server"
import { generateVCardQRCode } from "@/lib/qr-generator"
import { cacheManager } from "@/lib/cache-manager"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, address, company, website, format = "png", size = 300, color, backgroundColor } = body

    if (!name) {
      return NextResponse.json({ error: "Missing required parameter: name" }, { status: 400 })
    }

    // Generate a unique cache key
    const cacheKey = `vcard-qr-${JSON.stringify(body)}`
    const cachedQR = cacheManager.get(cacheKey)

    if (cachedQR) {
      return new NextResponse(cachedQR.buffer, {
        headers: {
          "Content-Type": cachedQR.contentType,
          "Cache-Control": "public, max-age=86400",
        },
      })
    }

    // Generate vCard QR code
    const { buffer, contentType } = await generateVCardQRCode({
      name,
      phone,
      email,
      address,
      company,
      website,
      format,
      size,
      color,
      backgroundColor,
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
    console.error("vCard QR code generation error:", error)
    return NextResponse.json({ error: "Failed to generate vCard QR code" }, { status: 500 })
  }
}

