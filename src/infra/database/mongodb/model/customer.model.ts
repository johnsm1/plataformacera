import { model } from 'mongoose'

import { customerSchema } from '@/infra/database/mongodb/schema'
import { ICustomer } from '@/core/customer/entity'

export const CustomerModel = model<ICustomer>(
  'Customer',
  customerSchema,
  'customers'
)
