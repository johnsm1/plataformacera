import { Schema } from 'mongoose'
import { ICustomer } from '@/core/customer/entity/customer.entity'
import { timestampPlugin } from '@/infra/database/mongodb/plugin'

export const customerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
})

customerSchema.plugin(timestampPlugin)
