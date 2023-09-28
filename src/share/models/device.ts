export interface DeviceDTO {
  id?: string
  name: string
  description: string
  code: string
  plant?: any
  measurings?: any
}

export interface UpdateDeviceDTO {
  farmId: string
  plantId: string
}
