import { type NextRequest, NextResponse } from "next/server"
import { generateQRCodeWithLogo } from "@/lib/qr-generator"
import { cacheManager } from "@/lib/cache-manager"

// Maximum logo file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024
// Allowed file types
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"]

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const data = formData.get("data") as string
    const logoFile = formData.get("logo") as File
    const format = (formData.get("format") as string) || "png"
    const size = Number(formData.get("size")) || 300

    if (!data) {
      return NextResponse.json({ error: "Missing required parameter: data" }, { status: 400 })
    }

    if (!logoFile) {
      return NextResponse.json({ error: "Missing required parameter: logo" }, { status: 400 })
    }

    // Validate file size
    if (logoFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Logo file too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB` },
        { status: 400 },
      )
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(logoFile.type)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(", ")}` },
        { status: 400 },
      )
    }

    // Process logo file
    const logoBuffer = Buffer.from(await logoFile.arrayBuffer())

    // Generate a unique cache key
    const cacheKey = `logo-qr-${data}-${format}-${size}-${logoFile.name}`
    const cachedQR = cacheManager.get(cacheKey)

    if (cachedQR) {
      return new NextResponse(cachedQR.buffer, {
        headers: {
          "Content-Type": cachedQR.contentType,
          "Cache-Control": "public, max-age=86400",
        },
      })
    }

    // Generate QR code with logo
    const { buffer, contentType } = await generateQRCodeWithLogo({
      data,
      logoBuffer,
      format,
      size,
      errorCorrectionLevel: "H", // Higher error correction for logo
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
    console.error("QR code with logo generation error:", error)
    return NextResponse.json({ error: "Failed to generate QR code with logo" }, { status: 500 })
  }
}

