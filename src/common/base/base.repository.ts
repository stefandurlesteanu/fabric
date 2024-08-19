import { Document, FilterQuery, Model } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: unknown): Promise<T> {
    return this.model.create(data);
  }

  async findOne(filter: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T | null> {
    return this.model
      .findOne(filter, {
        _id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(filter?: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filter);
  }

  async update(
    entityFilterQuery: FilterQuery<T>,
    updateData: any,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(entityFilterQuery, updateData, {
      new: true,
      projection: {
        _id: 0,
        __v: 0,
        ...projection,
      },
    });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({id}).exec();
  }
}
