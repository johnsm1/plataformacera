import { Router } from 'express'

import { controllerAdapter } from '@/common/adapter/controller-adapater'
import { makeAuthController } from '@/core/auth/factory/controller'

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Operações de autenticação
 */

export default (router: Router): void => {
  const authController = makeAuthController()

  /**
   * @swagger
   * /auth/sign-in:
   *   post:
   *     summary: Sign in
   *     description: Realiza o login de um usuário.
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: Email do usuário.
   *               password:
   *                 type: string
   *                 description: Senha do usuário.
   *             required:
   *               - email
   *               - password
   *     responses:
   *       200:
   *         description: Login realizado com sucesso. Retorna um token de acesso.
   *       401:
   *         description: Credenciais inválidas.
   */
  router.post('/auth/sign-in', controllerAdapter(authController, 'signIn'))

  /**
   * @swagger
   * /auth/sign-up:
   *   post:
   *     summary: Sign up
   *     description: Realiza o cadastro de um novo usuário.
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 description: Email do usuário.
   *               password:
   *                 type: string
   *                 description: Senha do usuário.
   *               name:
   *                 type: string
   *                 description: ADMIN | USER.
   *               role:
   *                  type: string
   *                  description: Nome do usuário.
   *             required:
   *               - email
   *               - password
   *               - name
   *               - role
   *     responses:
   *       201:
   *         description: Usuário cadastrado com sucesso.
   *       400:
   *         description: Dados inválidos.
   */
  router.post('/auth/sign-up', controllerAdapter(authController, 'signUp'))

  /**
   * @swagger
   * /auth/refresh-token:
   *   post:
   *     summary: Refresh token
   *     description: Renova o token de acesso.
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *                 description: Token de atualização do usuário.
   *             required:
   *               - refreshToken
   *     responses:
   *       200:
   *         description: Token renovado com sucesso.
   *       401:
   *         description: Token inválido ou expirado.
   */
  router.post(
    '/auth/refresh-token',
    controllerAdapter(authController, 'refreshToken')
  )
}
