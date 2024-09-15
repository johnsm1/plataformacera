export interface Repository<T> {
  save(entity: T): Promise<T>
  findById(id: string): Promise<T>
}
