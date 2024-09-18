/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function mapObjectId(obj: any): any {
  if (typeof obj !== 'object' || obj === null || obj instanceof Date) {
    return obj
  }

  const { _id, __v, ...rest } = obj

  const mappedRest = Object.keys(rest).reduce((acc, key) => {
    acc[key] = mapObjectId(rest[key])
    return acc
  }, {} as any)

  return { ...mappedRest, ...(!!_id && { id: _id.toHexString() }) }
}
