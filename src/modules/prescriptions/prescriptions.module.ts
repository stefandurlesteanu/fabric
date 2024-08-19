import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PatientsService } from '../patients/patients.service';
import { Patient, PatientSchema } from '../patients/schemas/patient.schema';
import { PrescriptionRepository } from './prescription.repository';
import { PrescriptionsController } from './prescriptions.controller';
import { PrescriptionsService } from './prescriptions.service';
import { Prescription, PrescriptionSchema } from './schemas/prescription.schema';
import { PatientsModule } from '../patients/patients.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Prescription.name,
        schema: PrescriptionSchema,
      },
      {
        name: Patient.name,
        schema: PatientSchema,
      },
    ]),
    PatientsModule
  ],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService, PrescriptionRepository],
})
export class PrescriptionsModule {}
