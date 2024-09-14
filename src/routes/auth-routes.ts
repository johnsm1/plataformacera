import { Router } from 'express'

import { makeAuthController } from '@/auth/factory/controller'
import { controllerAdapter } from '@/common/adapter/controller-adpater'

export default (router: Router): void => {
  const authController = makeAuthController()

  router.post('/auth/sign-in', controllerAdapter(authController, 'signUp'))
}
