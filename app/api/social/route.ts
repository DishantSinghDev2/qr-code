import { type NextRequest, NextResponse } from "next/server"
import { generateSocialQRCode } from "@/lib/qr-generator"
import { cacheManager } from "@/lib/cache-manager"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { platform, username, format = "png", size = 300, color, backgroundColor } = body

    if (!platform || !username) {
      return NextResponse.json({ error: "Missing required parameters: platform and username" }, { status: 400 })
    }

    // Validate platform
    const supportedPlatforms = [
      "facebook",
      "youtube",
      "twitter",
      "instagram",
      "linkedin",
      "whatsapp",
      "telegram",
      "snapchat",
    ]

    if (!supportedPlatforms.includes(platform.toLowerCase())) {
      return NextResponse.json({ error: "Unsupported platform", supportedPlatforms }, { status: 400 })
    }

    // Generate a unique cache key
    const cacheKey = `social-qr-${platform}-${username}-${format}-${size}-${color}-${backgroundColor}`
    const cachedQR = cacheManager.get(cacheKey)

    if (cachedQR) {
      return new NextResponse(cachedQR.buffer, {
        headers: {
          "Content-Type": cachedQR.contentType,
          "Cache-Control": "public, max-age=86400",
        },
      })
    }

    // Generate social QR code
    const { buffer, contentType } = await generateSocialQRCode({
      platform,
      username,
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
    console.error("Social QR code generation error:", error)
    return NextResponse.json({ error: "Failed to generate social QR code" }, { status: 500 })
  }
}

