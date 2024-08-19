import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base/base.repository';
import { Prescription, PrescriptionDocument } from './schemas/prescription.schema';

@Injectable()
export class PrescriptionRepository extends BaseRepository<PrescriptionDocument> {
  constructor(@InjectModel(Prescription.name) private readonly _patientModel: Model<PrescriptionDocument>) {
    super(_patientModel);
  }
}
