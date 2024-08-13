import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PatientDto } from './dto/patient.dto';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<PatientDto> {
    const createdPatient = new this.patientModel(createPatientDto);
    const savedPatient = await createdPatient.save();
    return this.toPatientDto(savedPatient);
  }

  async findAll() {
    const patients = await this.patientModel.find().exec();
    return patients.map(this.toPatientDto);
  }

  async findOne(id: string): Promise<PatientDto> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const patient = await this.patientModel.findById(id).exec();
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return this.toPatientDto(patient);
  }

  private toPatientDto(patient: Patient): PatientDto {
    return {
      id: patient.id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      contact: patient.contact,
    };
  }
}
