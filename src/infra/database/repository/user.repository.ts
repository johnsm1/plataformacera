import { Model } from 'mongoose'

import { Repository } from '@/common/repository'
import { User } from '@/user/entity/user.entity'
import { UserModel } from '@/infra/database/model'
import { mapObjectId } from '@/infra/database/helper'

export class UserRepository implements Repository<User> {
  private model: Model<User>

  constructor() {
    this.model = UserModel
  }

  findById(id: string): Promise<User> {
    return this.model.findById(id).exec()
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ email }).exec()
  }

  async save(entity: User): Promise<User> {
    const { email, name, password, roles } = entity

    const document = await this.model.create({
      email,
      name,
      password,
      roles: roles.map((r) => r.id),
    })

    return mapObjectId(document.toObject())
  }
}
