import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from 'src/patients/entities/patient.entity';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

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
  providers: [PatientsService],
})
export class PatientsModule {}
