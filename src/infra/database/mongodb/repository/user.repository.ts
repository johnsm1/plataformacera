import { Model } from 'mongoose'
import { Repository } from '@/common/repository'
import { IUser } from '@/core/user/entity/user.entity'
import { UserModel } from '../model'
import { mapObjectId } from '../helper'

export class UserRepository implements Repository<IUser> {
  private model: Model<IUser>

  constructor() {
    this.model = UserModel
  }

  findById(id: string): Promise<IUser> {
    return this.model.findById(id).exec()
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email }).exec()
  }

  async save(entity: IUser): Promise<IUser> {
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
