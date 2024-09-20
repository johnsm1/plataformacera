import { UpdateServiceDto } from '@/core/service/dto'
import { validateId } from './validate-object-id.dto'

export function validateAllId(id: string, dto: UpdateServiceDto) {
  const { vehicle, customer } = dto

  if (vehicle) {
    validateId(vehicle)
  }

  if (customer) {
    validateId(customer)
  }

  if (id) {
    validateId(id)
  }
}
