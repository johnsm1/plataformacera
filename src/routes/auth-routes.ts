import { Router } from 'express'

import { makeAuthController } from '@/auth/factory/controller'
import { controllerAdapter } from '@/common/adapter/controller-adpater'

export default (router: Router): void => {
  const authController = makeAuthController()

  router.post('/auth/sign-in', controllerAdapter(authController, 'signIn'))
  router.post('/auth/sign-up', controllerAdapter(authController, 'signUp'))
  router.post(
    '/auth/refresh-token',
    controllerAdapter(authController, 'refreshToken')
  )
}
