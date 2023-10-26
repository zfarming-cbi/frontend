export interface MeasuringHistoryDTO {
  names: string[]
  dates: string[]
  data: any[]
  maxRange: number
}

export interface MeasuringHistoryAverageDTO {
  namesSensor: string[]
  data: number[]
  maxRange: number
}
