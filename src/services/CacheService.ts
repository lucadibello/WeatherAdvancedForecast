import { CACHE_LIFETIME } from "../constants/Cache"
import CachedData from "../models/CachedData"

const log = (...props: any[]): void => {
  if (process.env.NODE_ENV !== "production") {
    console.log("[CACHE]", props)
  }
}

const buildCachedData = (value: string, dataSource: Function): CachedData => {
  return {
    data: value,
    cachedAt: Date.now(),
    lifetime: CACHE_LIFETIME,
    source: dataSource
  }
}

const cacheData = (key: string, value: string, dataSource: Function) => {
  // Init cache data
  const cachedData = buildCachedData(value, dataSource)

  console.log("Caching data: ", cachedData)

  // cache data into localstorage
  localStorage.setItem(key, JSON.stringify(cachedData))
}

const getCachedData = (key: string): CachedData | null => {
  if (cacheExists(key)) {
    log("Data cached")
    if (!isExpired(key)) {
      log("Cache not expired, is valid!")
      // Data exists, fetch from localStorage
      const data = localStorage.getItem(key)
      if (data != null) {
        // Get cached data
        const cachedData: CachedData = JSON.parse(data)
        
        // Parse JSON nested data
        cachedData.data = JSON.parse(cachedData.data) 
        // Return data
        return cachedData
      } else {
        return null
      }
    } else {
      log("Cache expired, can't recieve data from cache")
      // refresh data
      return null
    }
  } else {
    // Cached data not found
    return null
  }
}

const isExpired = (key: string): boolean => {
  // Get cached data
  const cachedData = localStorage.getItem(key)
  // Check local storage return value
  if (cachedData != null) {
    // Data found: check if expired
    const jsonData: CachedData = JSON.parse(cachedData)

    // Get current timestamp
    const now = Date.now()

    // Get time difference
    return Math.abs(now - jsonData.cachedAt) > jsonData.lifetime
  } else {
    // Data not found: returning null
    return false
  }
}
 

const cacheExists = (key: string): boolean => {
  // Get cached data
  const cachedData = localStorage.getItem(key)
  // Check local storage return value
  return cachedData != null
} 

export {
  cacheData,
  getCachedData
}