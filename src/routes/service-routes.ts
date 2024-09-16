import { controllerAdapter } from '@/common/adapter/controller-adpater'
import { makeServiceController } from '@/service/factory/controller/service-controller.factory'
import { Router } from 'express'

export default (router: Router): void => {
  const serviceController = makeServiceController()

  router.post('/service', controllerAdapter(serviceController, 'create'))
  router.put('/service/:id', controllerAdapter(serviceController, 'update'))
  router.get('/service/search', controllerAdapter(serviceController, 'findBy'))
  router.get('/service', controllerAdapter(serviceController, 'findAll'))
  router.get('/service', controllerAdapter(serviceController, 'find'))
  router.delete('/service/:id', controllerAdapter(serviceController, 'delete'))
}
