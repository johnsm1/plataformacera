import { controllerAdapter } from '@/common/adapter/controller-adapater'
import { ServiceControllerFactory } from '@/core/service/factory'
import { Router } from 'express'

export default (router: Router): void => {
  const serviceController = ServiceControllerFactory.create()

  router.post('/services', controllerAdapter(serviceController, 'save'))
  // router.put('/service/:id', controllerAdapter(serviceController, 'update'))
  // router.get('/service/search', controllerAdapter(serviceController, 'findBy'))
  // router.get('/service', controllerAdapter(serviceController, 'findAll'))
  // router.get('/service/:id', controllerAdapter(serviceController, 'find'))
  // router.delete('/service/:id', controllerAdapter(serviceController, 'delete'))
}
