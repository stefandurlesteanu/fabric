import { FilterQuery, Document } from 'mongoose';
import { BaseRepository } from './base.repository';

export abstract class BaseService<T extends Document> {
  constructor(protected readonly repository: BaseRepository<T>) {}

  async create( data: unknown): Promise<any> {
    return this.repository.create(data);
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.repository.findOne(filter);
  }

  async find(filter?: FilterQuery<T>): Promise<T[]> {
    return this.repository.find(filter);
  }

  async update(id: string, updateData: unknown): Promise<T | null> {
    return this.repository.update({ id }, updateData);
  }

  async delete(id: string): Promise<T | null> {
    return await this.repository.delete(id);
  }
}
