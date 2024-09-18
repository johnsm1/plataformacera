/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function mapObjectId(data: any) {
  const { _id, __v, ...rest } = data
  return { ...rest, id: _id.toHexString() }
}
