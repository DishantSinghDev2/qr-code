import { type NextRequest, NextResponse } from "next/server"
import { analyticsManager } from "@/lib/analytics-manager"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const qrId = searchParams.get("id")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    if (!qrId) {
      return NextResponse.json({ error: "Missing required parameter: id" }, { status: 400 })
    }

    // Get analytics data
    const analyticsData = await analyticsManager.getAnalytics({
      qrId,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    })

    return NextResponse.json(analyticsData)
  } catch (error) {
    console.error("Analytics retrieval error:", error)
    return NextResponse.json({ error: "Failed to retrieve analytics data" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { qrId, deviceType, location } = body

    if (!qrId) {
      return NextResponse.json({ error: "Missing required parameter: qrId" }, { status: 400 })
    }

    // Record scan event
    await analyticsManager.recordScan({
      qrId,
      deviceType,
      location,
      timestamp: new Date(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics recording error:", error)
    return NextResponse.json({ error: "Failed to record analytics data" }, { status: 500 })
  }
}

