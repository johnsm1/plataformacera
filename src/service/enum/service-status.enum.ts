export enum ServiceStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export const StatusDetails = {
  [ServiceStatus.PENDING]: {
    display: 'Pendente',
    value: ServiceStatus.PENDING,
  },
  [ServiceStatus.IN_PROGRESS]: {
    display: 'Em Andamento',
    value: ServiceStatus.IN_PROGRESS,
  },
  [ServiceStatus.COMPLETED]: {
    display: 'Concluído',
    value: ServiceStatus.COMPLETED,
  },
}
