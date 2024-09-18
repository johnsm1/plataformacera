import { model } from 'mongoose'

import { CustomerSchema } from '@/infra/database/mongodb/schema'
import { ICustomer } from '@/core/customer/entity'

export const CustomerModel = model<ICustomer>(
  'Customer',
  CustomerSchema,
  'customers'
)
