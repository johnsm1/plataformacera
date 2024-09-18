import { CustomerRepository } from '@/infra/database/mongodb/repository'
import { CustomerModel } from '@/infra/database/mongodb/model'
import { ICustomer } from '@/core/customer/entity'
import { logger } from '@/config/logger'

jest.mock('@/config/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}))

describe('CustomerRepository', () => {
  let repository: CustomerRepository

  beforeEach(() => {
    repository = new CustomerRepository()

    jest.clearAllMocks()
  })

  describe('findById', () => {
    it('should return a customer by id', async () => {
      const mockCustomer: ICustomer = {
        id: '507f191e810c19729de860ea',
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }

      jest.spyOn(CustomerModel, 'findById').mockResolvedValueOnce({
        toObject: () => mockCustomer,
      })

      const result = await repository.findById('507f191e810c19729de860ea')

      expect(result).toBeDefined()
      expect(result).toMatchObject({
        id: '507f191e810c19729de860ea',
        name: 'John Doe',
      })
    })

    it('should return undefined if no customer is found', async () => {
      jest.spyOn(CustomerModel, 'findById').mockResolvedValueOnce(null)

      const result = await repository.findById('507f191e810c19729de860ea')

      expect(result).toBeUndefined()
      expect(logger.error).not.toHaveBeenCalled()
    })

    it('should log an error and return undefined on exception', async () => {
      jest
        .spyOn(CustomerModel, 'findById')
        .mockRejectedValueOnce(new Error('Database error'))

      const result = await repository.findById('507f191e810c19729de860ea')

      expect(result).toBeUndefined()
      expect(logger.error).toHaveBeenCalledWith('Database error')
    })
  })

  describe('save', () => {
    it('should log an error and throw if saving fails', async () => {
      const mockCustomer: ICustomer = {
        id: '507f191e810c19729de860ec',
        name: 'Jake Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }

      jest
        .spyOn(CustomerModel, 'create')
        .mockRejectedValueOnce(new Error('Save error'))

      await expect(repository.save(mockCustomer)).rejects.toThrow('Save error')
      expect(logger.error).toHaveBeenCalledWith(new Error('Save error'))
    })
  })
})
