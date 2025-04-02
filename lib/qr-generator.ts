import QRCodeStyling from "qr-code-styling"
import { AwesomeQR } from "awesome-qr"
import sharp from "sharp"
import { nanoid } from "nanoid"

// Content type mapping
const contentTypes = {
  png: "image/png",
  svg: "image/svg+xml",
  pdf: "application/pdf",
  eps: "application/postscript",
}

// Basic QR code generation
export async function generateQRCode({ data, format = "png", size = 300, errorCorrectionLevel = "M" }) {
  try {
    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: format,
      data: data,
      dotsOptions: {
        color: "#000000",
        type: "square",
      },
      cornersSquareOptions: {
        type: "square",
      },
      backgroundOptions: {
        color: "#FFFFFF",
      },
      qrOptions: {
        errorCorrectionLevel: errorCorrectionLevel,
      },
    })

    const buffer = await qrCode.getRawData(format)

    return {
      buffer,
      contentType: contentTypes[format] || "image/png",
    }
  } catch (error) {
    console.error("QR generation error:", error)
    throw new Error("Failed to generate QR code")
  }
}

// Custom QR code generation
export async function generateCustomQRCode({
  data,
  format = "png",
  size = 300,
  color = "#000000",
  backgroundColor = "#FFFFFF",
  cornerStyle = "square",
  dotStyle = "square",
  errorCorrectionLevel = "M",
  gradient = null,
}) {
  try {
    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: format,
      data: data,
      dotsOptions: {
        color: gradient ? undefined : color,
        type: dotStyle,
        gradient: gradient
          ? {
              type: gradient.type || "linear",
              rotation: gradient.rotation || 0,
              colorStops: gradient.colorStops || [
                { offset: 0, color: gradient.color1 || "#000000" },
                { offset: 1, color: gradient.color2 || "#000000" },
              ],
            }
          : undefined,
      },
      cornersSquareOptions: {
        type: cornerStyle,
        color: color,
      },
      cornersDotOptions: {
        type: cornerStyle,
        color: color,
      },
      backgroundOptions: {
        color: backgroundColor,
      },
      qrOptions: {
        errorCorrectionLevel: errorCorrectionLevel,
      },
    })

    const buffer = await qrCode.getRawData(format)

    return {
      buffer,
      contentType: contentTypes[format] || "image/png",
    }
  } catch (error) {
    console.error("Custom QR generation error:", error)
    throw new Error("Failed to generate custom QR code")
  }
}

// Social media QR code generation
export async function generateSocialQRCode({
  platform,
  username,
  format = "png",
  size = 300,
  color = "#000000",
  backgroundColor = "#FFFFFF",
}) {
  try {
    // Generate appropriate URL based on platform
    let url
    switch (platform.toLowerCase()) {
      case "facebook":
        url = `https://facebook.com/${username}`
        break
      case "youtube":
        url = `https://youtube.com/${username}`
        break
      case "twitter":
        url = `https://twitter.com/${username}`
        break
      case "instagram":
        url = `https://instagram.com/${username}`
        break
      case "linkedin":
        url = `https://linkedin.com/in/${username}`
        break
      case "whatsapp":
        url = `https://wa.me/${username}`
        break
      case "telegram":
        url = `https://t.me/${username}`
        break
      case "snapchat":
        url = `https://snapchat.com/add/${username}`
        break
      default:
        throw new Error(`Unsupported platform: ${platform}`)
    }

    // Generate QR code with platform-specific styling
    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: format,
      data: url,
      dotsOptions: {
        color: color,
        type: "square",
      },
      cornersSquareOptions: {
        type: "square",
        color: color,
      },
      backgroundOptions: {
        color: backgroundColor,
      },
      qrOptions: {
        errorCorrectionLevel: "M",
      },
    })

    const buffer = await qrCode.getRawData(format)

    return {
      buffer,
      contentType: contentTypes[format] || "image/png",
    }
  } catch (error) {
    console.error("Social QR generation error:", error)
    throw new Error("Failed to generate social QR code")
  }
}

// vCard QR code generation
export async function generateVCardQRCode({
  name,
  phone,
  email,
  address,
  company,
  website,
  format = "png",
  size = 300,
  color = "#000000",
  backgroundColor = "#FFFFFF",
}) {
  try {
    // Generate vCard format
    let vCardData = "BEGIN:VCARD\nVERSION:3.0\n"
    vCardData += `N:${name}\n`
    vCardData += `FN:${name}\n`

    if (phone) vCardData += `TEL:${phone}\n`
    if (email) vCardData += `EMAIL:${email}\n`
    if (address) vCardData += `ADR:;;${address};;;\n`
    if (company) vCardData += `ORG:${company}\n`
    if (website) vCardData += `URL:${website}\n`

    vCardData += "END:VCARD"

    // Generate QR code
    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: format,
      data: vCardData,
      dotsOptions: {
        color: color,
        type: "square",
      },
      cornersSquareOptions: {
        type: "square",
        color: color,
      },
      backgroundOptions: {
        color: backgroundColor,
      },
      qrOptions: {
        errorCorrectionLevel: "M",
      },
    })

    const buffer = await qrCode.getRawData(format)

    return {
      buffer,
      contentType: contentTypes[format] || "image/png",
    }
  } catch (error) {
    console.error("vCard QR generation error:", error)
    throw new Error("Failed to generate vCard QR code")
  }
}

// QR code with logo generation
export async function generateQRCodeWithLogo({
  data,
  logoBuffer,
  format = "png",
  size = 300,
  errorCorrectionLevel = "H",
}) {
  try {
    // Process logo with sharp
    const resizedLogo = await sharp(logoBuffer)
      .resize(Math.floor(size * 0.2), Math.floor(size * 0.2), {
        fit: "inside",
      })
      .toBuffer()

    // Generate QR code with logo using AwesomeQR
    const { buffer } = await new AwesomeQR({
      text: data,
      size: size,
      margin: 10,
      correctLevel:
        errorCorrectionLevel === "L" ? 1 : errorCorrectionLevel === "M" ? 0 : errorCorrectionLevel === "Q" ? 3 : 2,
      logoImage: resizedLogo,
      logoScale: 0.2,
      logoMargin: 6,
      dotScale: 0.7,
      backgroundImage: undefined,
      autoColor: true,
    }).draw()

    // Convert to requested format if not PNG
    if (format !== "png") {
      const sharpInstance = sharp(buffer)

      if (format === "svg") {
        const svgBuffer = await sharpInstance.toFormat("svg").toBuffer()
        return {
          buffer: svgBuffer,
          contentType: "image/svg+xml",
        }
      } else if (format === "pdf") {
        const pdfBuffer = await sharpInstance.toFormat("pdf").toBuffer()
        return {
          buffer: pdfBuffer,
          contentType: "application/pdf",
        }
      } else {
        const outputBuffer = await sharpInstance.toFormat(format).toBuffer()
        return {
          buffer: outputBuffer,
          contentType: contentTypes[format] || "image/png",
        }
      }
    }

    return {
      buffer,
      contentType: "image/png",
    }
  } catch (error) {
    console.error("QR with logo generation error:", error)
    throw new Error("Failed to generate QR code with logo")
  }
}

// Bulk QR code generation
export async function generateBulkQRCodes({ items, format = "png", size = 300 }) {
  try {
    const results = await Promise.all(
      items.map(async (item) => {
        const id = nanoid(10)
        let qrResult

        if (item.type === "basic") {
          qrResult = await generateQRCode({
            data: item.data,
            format,
            size,
            errorCorrectionLevel: item.errorCorrectionLevel || "M",
          })
        } else if (item.type === "custom") {
          qrResult = await generateCustomQRCode({
            data: item.data,
            format,
            size,
            color: item.color,
            backgroundColor: item.backgroundColor,
            cornerStyle: item.cornerStyle,
            dotStyle: item.dotStyle,
            errorCorrectionLevel: item.errorCorrectionLevel || "M",
            gradient: item.gradient,
          })
        } else if (item.type === "social") {
          qrResult = await generateSocialQRCode({
            platform: item.platform,
            username: item.username,
            format,
            size,
            color: item.color,
            backgroundColor: item.backgroundColor,
          })
        } else if (item.type === "vcard") {
          qrResult = await generateVCardQRCode({
            name: item.name,
            phone: item.phone,
            email: item.email,
            address: item.address,
            company: item.company,
            website: item.website,
            format,
            size,
            color: item.color,
            backgroundColor: item.backgroundColor,
          })
        } else {
          throw new Error(`Unsupported QR code type: ${item.type}`)
        }

        // Convert buffer to base64 for JSON response
        const base64Data = qrResult.buffer.toString("base64")

        return {
          id,
          data: item.data || item.username || item.name,
          type: item.type,
          format,
          contentType: qrResult.contentType,
          base64: `data:${qrResult.contentType};base64,${base64Data}`,
        }
      }),
    )

    return results
  } catch (error) {
    console.error("Bulk QR generation error:", error)
    throw new Error("Failed to generate bulk QR codes")
  }
}

