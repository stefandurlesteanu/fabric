import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from 'src/patients/entities/patient.entity';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import {
  Appointment,
  AppointmentSchema,
} from './entities/appointment.entity';

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
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
