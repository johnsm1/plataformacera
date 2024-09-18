import { Schema } from 'mongoose'

export const timestampPlugin = (schema: Schema) => {
  schema.add({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null },
  })

  schema.pre('save', function (next) {
    this.updatedAt = new Date()
    next()
  })

  schema.methods.softDelete = function () {
    this.deletedAt = new Date()
    return this.save()
  }
}
