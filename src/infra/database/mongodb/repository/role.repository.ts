import { Model } from 'mongoose'

import { IRole } from '@/core/auth/entity/role.entity'
import { Repository } from '@/common/repository'
import { RoleModel } from '../model'
import { mapObjectId } from '../helper'

export class RoleRepository implements Repository<IRole> {
  private model: Model<IRole>

  constructor() {
    this.model = RoleModel
  }
  async findById(id: string): Promise<IRole> {
    return await this.model.findById(id)
  }

  async save(entity: IRole): Promise<IRole> {
    const document = await this.model.create(entity)

    return mapObjectId(document.toObject())
  }

  async findAllByName(roles: string[]): Promise<IRole[]> {
    return await this.model.find({ name: { $in: roles } })
  }
}
