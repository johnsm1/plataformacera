import { Router } from 'express'
import { controllerAdapter } from '@/common/adapter/controller-adpater'
import { CustomerControllerFactory } from '@/core/customer/factory'

export default (router: Router): void => {
  const customerController = CustomerControllerFactory.create()

  router.post('/customers', controllerAdapter(customerController, 'save'))

  router.get(
    '/customers/:id',
    controllerAdapter(customerController, 'findById')
  )
}
