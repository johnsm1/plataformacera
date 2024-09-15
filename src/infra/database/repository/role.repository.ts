import { Model } from 'mongoose'

import { Role } from '@/auth/entity/role.entity'
import { Repository } from '@/common/repository'
import { RoleModel } from '@/infra/database/model'
import { mapObjectId } from '@/infra/database/helper/map-object-id'

export class RoleRepository implements Repository<Role> {
  private model: Model<Role>

  constructor() {
    this.model = RoleModel
  }
  async findById(id: string): Promise<Role> {
    return await this.model.findById(id)
  }

  async save(entity: Role): Promise<Role> {
    const document = await this.model.create(entity)

    return mapObjectId(document.toObject())
  }

  async findAllByName(roles: string[]): Promise<Role[]> {
    return await this.model.find({ name: { $in: roles } })
  }
}
