import { Schema } from 'mongoose'
import { ICustomer } from '@/core/customer/entity/customer.entity'

export const CustomerSchema = new Schema<ICustomer>({
  name: { type: String, required: true },
})
