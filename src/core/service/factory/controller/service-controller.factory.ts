import { ServiceController } from '@/service/controller/service.controller'
import {
  makeCreateUseCase,
  makeDeleteUseCase,
  makeFindAllUseCase,
  makeFindByUseCase,
  makeFindUseCase,
  makeUpdateUseCase,
} from '../use-case'

export function makeServiceController(): ServiceController {
  const createUseCase = makeCreateUseCase()
  const deleteUseCase = makeDeleteUseCase()
  const findUseCase = makeFindUseCase()
  const findByUseCase = makeFindByUseCase()
  const findAllUseCase = makeFindAllUseCase()
  const updateUseCase = makeUpdateUseCase()
  return new ServiceController(
    createUseCase,
    deleteUseCase,
    findUseCase,
    findByUseCase,
    findAllUseCase,
    updateUseCase
  )
}
