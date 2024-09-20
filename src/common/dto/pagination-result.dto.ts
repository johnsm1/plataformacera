export interface PaginationResultDto<T> {
  items: T[]
  total: number
  page: number
  pages: number
  availableFilters?: string[]
  filteredFields?: string[]
}
