export interface MeasuringHistoryDTO {
  names: string[]
  dates: string[]
  createdHour: string
  data: any[]
  maxRange: number
}

export interface MeasuringHistoryAverageDTO {
  namesSensor: string[]
  data: number[]
  maxRange: number
}
