import { IClient } from '@/client/entity/client.entity'
import { ClientRepository } from '@/infra/database/repository'

class ClientFacade {
  private clientRepository: ClientRepository

  constructor() {
    this.clientRepository = new ClientRepository()
  }

  public static makeClientFacade(): ClientFacade {
    return new ClientFacade()
  }

  public async save(client: IClient): Promise<IClient> {
    return await this.clientRepository.save(client)
  }

  public async getClient(id: string): Promise<IClient> {
    return await this.clientRepository.findById(id)
  }
}

export default ClientFacade
