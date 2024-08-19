import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsRepository } from './patient.repository';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { Patient, PatientSchema } from './schemas/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Patient.name,
        schema: PatientSchema,
      },
    ]),
  ],
  controllers: [PatientsController],
  providers: [PatientsService, PatientsRepository],
  exports: [PatientsService]
})
export class PatientsModule {}
