export default interface CachedData {
  data: any,
  cachedAt: number,
  lifetime: number,
  source: Function
}