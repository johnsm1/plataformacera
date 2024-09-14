/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UseCase<T = any, R = any> {
  execute(input: T): Promise<R>
}
