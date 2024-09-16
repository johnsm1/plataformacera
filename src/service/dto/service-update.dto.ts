import { ServiceStatus } from '../enum/service-status.enum'

export class ServiceUpdateDTO {
  serviceId: string
  description?: string
  status?: ServiceStatus
  value?: number
}
