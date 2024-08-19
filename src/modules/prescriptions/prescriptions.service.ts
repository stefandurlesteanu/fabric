import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/base/base.service';
import { PatientsService } from '../patients/patients.service';
import { PrescriptionRepository } from './prescription.repository';
import { Prescription, PrescriptionDocument } from './schemas/prescription.schema';

@Injectable()
export class PrescriptionsService extends BaseService<PrescriptionDocument> {
  constructor(
    private readonly _prescriptionsRepository: PrescriptionRepository,
    private readonly _patientsService: PatientsService,
  ) {
    super(_prescriptionsRepository);
  }

  async create(data: any): Promise<Prescription> {
    const patient = await this._patientsService.findOne({ id: +data.patient_id });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${data.patient_id} not found`);
    }

    return this._prescriptionsRepository.create(data);
  }

  async findByPatientIdAndMedication(patient_id?: number, medication?: string): Promise<Prescription[]> {
    const filter: any = {};
    if (patient_id) filter.patient_id = patient_id;
    if (medication) filter.medication = medication;

    return this._prescriptionsRepository.find(filter);
  }
}
