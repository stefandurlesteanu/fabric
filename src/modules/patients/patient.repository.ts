import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base/base.repository';
import { Patient, PatientDocument } from './schemas/patient.schema';

@Injectable()
export class PatientsRepository extends BaseRepository<PatientDocument> {
  constructor(@InjectModel(Patient.name) private readonly _patientModel: Model<PatientDocument>) {
    super(_patientModel);
  }
}
