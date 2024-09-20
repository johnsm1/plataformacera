import { controllerAdapter } from '@/common/adapter/controller-adapater'
import { roles } from '@/core/auth/enum/role.enum'
import { ServiceControllerFactory } from '@/core/service/factory'
import authMiddleware from '@/middlewares/auth.middleware'
import { Router } from 'express'

export default (router: Router): void => {
  const serviceController = ServiceControllerFactory.create()

  router.post(
    '/services',
    authMiddleware([roles.ADMIN]),
    controllerAdapter(serviceController, 'save')
  )
  router.put(
    '/service/:id',
    authMiddleware([roles.ADMIN]),
    controllerAdapter(serviceController, 'update')
  )
  router.get(
    '/service',
    authMiddleware([roles.ADMIN, roles.USER]),
    controllerAdapter(serviceController, 'findAllByFilter')
  )
  router.get(
    '/service/:id',
    authMiddleware([roles.ADMIN, roles.USER]),
    controllerAdapter(serviceController, 'findById')
  )
  router.delete(
    '/service/:id',
    authMiddleware([roles.ADMIN]),
    controllerAdapter(serviceController, 'delete')
  )
}
