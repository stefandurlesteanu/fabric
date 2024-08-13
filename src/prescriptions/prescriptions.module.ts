import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from '../patients/entities/patient.entity';
import { Prescription, PrescriptionSchema } from './entities/prescription.entity';
import { PrescriptionsController } from './prescriptions.controller';
import { PrescriptionsService } from './prescriptions.service';

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
  ],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
})
export class PrescriptionsModule {}
