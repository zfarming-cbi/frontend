export interface MeasuringHistorySensorDTO {
  sensorid: number
  name: string
  values: string[]
  minRange: number
  maxRange: number
  graphical_unit: string
}

export interface MeasuringHistoryDTO {
  names: string[]
  dates: string[]
  createdHour: string
  data: any[]
  maxRange: number
}

export interface MeasuringHistoryAverageDTO {
  namesSensor: string[]
  data: any[]
  maxRange: number
}
