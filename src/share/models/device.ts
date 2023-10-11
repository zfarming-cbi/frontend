export interface DeviceDTO {
  id?: string
  name: string
  description: string
  code: string
  plant?: any
  measurings?: any
}

export interface UpdateDeviceDTO {
  name?: string
  description?: string
  code?: string
  farmId?: string
  plantId?: string
}
