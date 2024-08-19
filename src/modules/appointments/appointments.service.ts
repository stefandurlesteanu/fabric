import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/base/base.service';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { PatientsService } from '../patients/patients.service';
import { AppointmentRepository } from './appointment.repository';

@Injectable()
export class AppointmentsService extends BaseService<AppointmentDocument> {
  constructor(
    private readonly _appointmentsRepository: AppointmentRepository,
    private readonly _patientsService: PatientsService,
  ) {
    super(_appointmentsRepository);
  }

  async create(data: any): Promise<Appointment> {
    const patient = await this._patientsService.findOne({ id: data.patient_id });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${data.patient_id} not found`);
    }
    return this._appointmentsRepository.create(data);
  }

  async findByPatientIdAndDoctor(patient_id?: number, doctor?: string): Promise<Appointment[]> {
    const filter: any = {};
    if (patient_id) filter.patient_id = patient_id;
    if (doctor) filter.doctor = doctor;

    return this._appointmentsRepository.find(filter);
  }
}
