import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Versão do OpenAPI
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Information',
      contact: {
        name: 'jOHN MEDINA',
      },
      servers: [
        {
          url: 'http://localhost:3000/api',
        },
      ],
    },
    components: {
      schemas: {
        ServiceDto: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID do serviço',
            },
            description: {
              type: 'string',
              description: 'Descrição do serviço',
            },
            completionDate: {
              type: 'string',
              format: 'date-time',
              description: 'Data de conclusão do serviço',
            },
            vehicle: {
              $ref: '#/components/schemas/VehicleDto',
            },
            customer: {
              $ref: '#/components/schemas/CustomerDto',
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
              description: 'Status do serviço',
            },
            value: {
              type: 'number',
              description: 'Valor do serviço',
            },
          },
        },
        UpdateServiceDto: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              description: 'Descrição do serviço',
            },
            completionDate: {
              type: 'string',
              format: 'date-time',
              description: 'Data de conclusão do serviço',
            },
            vehicle: {
              type: 'string',
              description: 'ID do veículo',
            },
            customer: {
              type: 'string',
              description: 'ID do cliente',
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], // ajuste conforme os valores de ServiceStatus
              description: 'Status do serviço',
            },
            value: {
              type: 'number',
              description: 'Valor do serviço',
            },
          },
        },
        ServiceFindByCriteriaDto: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID do serviço',
            },
            vehicle: {
              type: 'string',
              description: 'ID do veículo',
            },
            customer: {
              type: 'string',
              description: 'ID do cliente',
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
              description: 'Status do serviço',
            },
            page: {
              type: 'integer',
              description: 'Número da página para a paginação',
            },
            limit: {
              type: 'integer',
              description: 'Limite de resultados por página',
            },
          },
        },
        SaveServiceWithExistingEntitiesInputDto: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              description: 'Descrição do serviço',
            },
            vehicleId: {
              type: 'string',
              description: 'ID do veículo',
            },
            customerId: {
              type: 'string',
              description: 'ID do cliente',
            },
            value: {
              type: 'number',
              description: 'Valor do serviço',
            },
            status: {
              type: 'string',
              enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
              description: 'Status do serviço',
            },
          },
          required: [
            'description',
            'vehicleId',
            'customerId',
            'value',
            'status',
          ],
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

export default swaggerDocs
