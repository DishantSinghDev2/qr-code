// Simple in-memory analytics implementation
// In a production environment, this would be replaced with Redis or ClickHouse

class AnalyticsManager {
  private scans: Map<
    string,
    Array<{
      timestamp: Date
      deviceType?: string
      location?: string
    }>
  >

  constructor() {
    this.scans = new Map()
  }

  async recordScan({
    qrId,
    deviceType,
    location,
    timestamp,
  }: {
    qrId: string
    deviceType?: string
    location?: string
    timestamp: Date
  }) {
    if (!this.scans.has(qrId)) {
      this.scans.set(qrId, [])
    }

    const qrScans = this.scans.get(qrId)

    qrScans?.push({
      timestamp,
      deviceType,
      location,
    })
  }

  async getAnalytics({
    qrId,
    startDate,
    endDate,
  }: {
    qrId: string
    startDate?: Date
    endDate?: Date
  }) {
    const scans = this.scans.get(qrId) || []

    // Filter by date range if provided
    const filteredScans = scans.filter((scan) => {
      if (startDate && scan.timestamp < startDate) {
        return false
      }

      if (endDate && scan.timestamp > endDate) {
        return false
      }

      return true
    })

    // Calculate statistics
    const totalScans = filteredScans.length

    // Group by device type
    const deviceTypes = filteredScans.reduce(
      (acc, scan) => {
        const type = scan.deviceType || "unknown"
        acc[type] = (acc[type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Group by location
    const locations = filteredScans.reduce(
      (acc, scan) => {
        const location = scan.location || "unknown"
        acc[location] = (acc[location] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Group by day
    const scansByDay = filteredScans.reduce(
      (acc, scan) => {
        const day = scan.timestamp.toISOString().split("T")[0]
        acc[day] = (acc[day] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return {
      qrId,
      totalScans,
      deviceTypes,
      locations,
      scansByDay,
      timeRange: {
        start: startDate || filteredScans[0]?.timestamp || new Date(),
        end: endDate || filteredScans[filteredScans.length - 1]?.timestamp || new Date(),
      },
    }
  }
}

// Export singleton instance
export const analyticsManager = new AnalyticsManager()

