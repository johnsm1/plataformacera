import { Router } from 'express'

import { controllerAdapter } from '@/common/adapter/controller-adapater'
import { makeAuthController } from '@/core/auth/factory/controller'

export default (router: Router): void => {
  const authController = makeAuthController()

  router.post('/auth/sign-in', controllerAdapter(authController, 'signIn'))
  router.post('/auth/sign-up', controllerAdapter(authController, 'signUp'))
  router.post(
    '/auth/refresh-token',
    controllerAdapter(authController, 'refreshToken')
  )
}
