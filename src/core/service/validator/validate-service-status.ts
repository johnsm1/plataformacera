import { HttpException } from '@/common/exception/http-exception.error'
import { ServiceStatus } from '../enum'

export function validateServiceStatus(status: string): void {
  if (!Object.values(ServiceStatus).includes(status as ServiceStatus)) {
    throw new HttpException(`Invalid service status: ${status}`, 400)
  }
}
