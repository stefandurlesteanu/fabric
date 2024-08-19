import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/base/base.repository';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';

@Injectable()
export class AppointmentRepository extends BaseRepository<AppointmentDocument> {
  constructor(@InjectModel(Appointment.name) private readonly _appointmentModel: Model<AppointmentDocument>) {
    super(_appointmentModel);
  }
}
