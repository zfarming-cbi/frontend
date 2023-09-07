export interface DeviceDTO {
  id?: string
  name: string
  description: string
  code: string
}

export interface DeviceInputDTO {
  farmId?: string
}

export interface UpdateDeviceDTO {
  farmId: string
  plantId: string
}
