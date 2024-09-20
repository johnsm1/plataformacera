import { controllerAdapter } from '@/common/adapter/controller-adapater'
import { roles } from '@/core/auth/enum/role.enum'
import { ServiceControllerFactory } from '@/core/service/factory'
import authMiddleware from '@/middlewares/auth.middleware'
import { Router } from 'express'

/**
 * @swagger
 * tags:
 *   - name: Services
 *     description: Operações relacionadas a serviços
 */

export default (router: Router): void => {
  const serviceController = ServiceControllerFactory.create()

  /**
   * @swagger
   * /services:
   *   post:
   *     summary: Create a new service
   *     description: Cria um novo serviço. Apenas administradores podem realizar esta ação.
   *     tags: [Services]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SaveServiceWithExistingEntitiesInputDto'
   *     responses:
   *       201:
   *         description: Serviço criado com sucesso.
   *       403:
   *         description: Acesso negado.
   */
  router.post(
    '/services',
    authMiddleware([roles.ADMIN]),
    controllerAdapter(serviceController, 'save')
  )

  /**
   * @swagger
   * /service/{id}:
   *   put:
   *     summary: Update a service
   *     description: Atualiza um serviço existente. Apenas administradores podem realizar esta ação.
   *     tags: [Services]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateServiceDto'
   *     responses:
   *       200:
   *         description: Serviço atualizado com sucesso.
   *       403:
   *         description: Acesso negado.
   */
  router.put(
    '/service/:id',
    authMiddleware([roles.ADMIN]),
    controllerAdapter(serviceController, 'update')
  )

  /**
   * @swagger
   * /service:
   *   get:
   *     summary: Get all services by filter
   *     description: Retorna todos os serviços com base em um filtro. Usuários e administradores podem acessar.
   *     tags: [Services]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: query
   *         name: id
   *         required: false
   *         schema:
   *           type: string
   *         description: ID do serviço.
   *       - in: query
   *         name: vehicle
   *         required: false
   *         schema:
   *           type: string
   *         description: ID do veículo associado ao serviço.
   *       - in: query
   *         name: customer
   *         required: false
   *         schema:
   *           type: string
   *         description: ID do cliente associado ao serviço.
   *       - in: query
   *         name: status
   *         required: false
   *         schema:
   *           type: string
   *           enum:
   *             - PENDING
   *             - IN_PROGRESS
   *             - COMPLETED
   *         description: Status do serviço.
   *       - in: query
   *         name: page
   *         required: false
   *         schema:
   *           type: integer
   *           format: int32
   *         description: Número da página para paginação.
   *       - in: query
   *         name: limit
   *         required: false
   *         schema:
   *           type: integer
   *           format: int32
   *         description: Número máximo de resultados por página.
   *     responses:
   *       200:
   *         description: Lista de serviços retornada com sucesso.
   *       403:
   *         description: Acesso negado.
   */
  router.get(
    '/service',
    authMiddleware([roles.ADMIN, roles.USER]),
    controllerAdapter(serviceController, 'findAllByFilter')
  )

  /**
   * @swagger
   * /service/{id}:
   *   get:
   *     summary: Get a service by ID
   *     description: Retorna um serviço pelo seu ID. Usuários e administradores podem acessar.
   *     tags: [Services]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Serviço encontrado com sucesso.
   *       404:
   *         description: Serviço não encontrado.
   */
  router.get(
    '/service/:id',
    authMiddleware([roles.ADMIN, roles.USER]),
    controllerAdapter(serviceController, 'findById')
  )

  /**
   * @swagger
   * /service/{id}:
   *   delete:
   *     summary: Delete a service
   *     description: Deleta um serviço existente. Apenas administradores podem realizar esta ação.
   *     tags: [Services]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Serviço deletado com sucesso.
   *       403:
   *         description: Acesso negado.
   */
  router.delete(
    '/service/:id',
    authMiddleware([roles.ADMIN]),
    controllerAdapter(serviceController, 'delete')
  )
}
