import { ServiceStatus } from '../enum/service-status.enum'

export class ServiceResponseDTO {
  serviceId: string
  description: string
  status: ServiceStatus
  value: number
}
