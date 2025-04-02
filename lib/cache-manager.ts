// Simple in-memory cache implementation
class CacheManager {
  private cache: Map<string, { buffer: Buffer; contentType: string; timestamp: number }>
  private maxSize: number
  private ttl: number // Time to live in milliseconds
  private maxBufferSize: number // Maximum buffer size in bytes

  constructor(maxSize = 1000, ttlInSeconds = 3600, maxBufferSizeMB = 100) {
    this.cache = new Map()
    this.maxSize = maxSize
    this.ttl = ttlInSeconds * 1000
    this.maxBufferSize = maxBufferSizeMB * 1024 * 1024 // Convert MB to bytes

    // Start periodic cleanup
    setInterval(() => this.cleanup(), 60000) // Clean up every minute
  }

  get(key: string) {
    const item = this.cache.get(key)

    if (!item) {
      return null
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return {
      buffer: item.buffer,
      contentType: item.contentType,
    }
  }

  set(key: string, value: { buffer: Buffer; contentType: string }) {
    // Check buffer size
    if (value.buffer.length > this.maxBufferSize) {
      console.warn(`Buffer too large (${value.buffer.length} bytes), not caching`)
      return
    }

    // If cache is at max size, remove oldest items
    if (this.cache.size >= this.maxSize) {
      const oldestKeys = Array.from(this.cache.keys())
        .sort((a, b) => {
          return (this.cache.get(a)?.timestamp || 0) - (this.cache.get(b)?.timestamp || 0)
        })
        .slice(0, Math.ceil(this.maxSize * 0.1)) // Remove oldest 10%

      oldestKeys.forEach((key) => this.cache.delete(key))
    }

    this.cache.set(key, {
      ...value,
      timestamp: Date.now(),
    })
  }

  cleanup() {
    const now = Date.now()

    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.ttl) {
        this.cache.delete(key)
      }
    }
  }

  clear() {
    this.cache.clear()
  }

  size() {
    return this.cache.size
  }

  memoryUsage() {
    let totalBytes = 0
    for (const item of this.cache.values()) {
      totalBytes += item.buffer.length
    }
    return {
      items: this.cache.size,
      bytes: totalBytes,
      megabytes: (totalBytes / (1024 * 1024)).toFixed(2),
    }
  }
}

// Export singleton instance
export const cacheManager = new CacheManager()

