import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsModule } from '../patients/patients.module';
import { Patient, PatientSchema } from '../patients/schemas/patient.schema';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import {
  Appointment,
  AppointmentSchema,
} from './schemas/appointment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Appointment.name,
        schema: AppointmentSchema,
      },
      {
        name: Patient.name,
        schema: PatientSchema,
      },
    ]),
    PatientsModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentRepository],
})
export class AppointmentsModule {}
