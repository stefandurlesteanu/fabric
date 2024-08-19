import { Injectable } from '@nestjs/common';
import { BaseService } from '../../common/base/base.service';
import { PatientsRepository } from './patient.repository';
import { PatientDocument } from './schemas/patient.schema';

@Injectable()
export class PatientsService extends BaseService<PatientDocument> {
  constructor(private readonly _patientsRepository: PatientsRepository) {
    super(_patientsRepository);
  }
}
