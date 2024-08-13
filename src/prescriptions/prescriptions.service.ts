import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from '../patients/entities/patient.entity';
import { PrescriptionDto } from '../prescriptions/dto/prescription.dto';
import { Prescription } from '../prescriptions/entities/prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectModel(Prescription.name)
    private prescriptionModel: Model<Prescription>,
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
  ) {}

  async create(
    createPrescriptionDto: CreatePrescriptionDto,
  ): Promise<PrescriptionDto> {
    const patientExists = await this.patientModel.exists({
      _id: createPrescriptionDto.patient_id,
    });
    if (!patientExists) {
      throw new NotFoundException(
        `Patient with ID ${createPrescriptionDto.patient_id} not found`,
      );
    }

    const createdPrescription = new this.prescriptionModel(
      createPrescriptionDto,
    );
    const savedPrescription = await createdPrescription.save();
    return this.toPrescriptionDto(savedPrescription);
  }

  async findAll(
    patient_id?: number,
    medication?: string,
  ): Promise<PrescriptionDto[]> {
    const query: any = {};
    if (patient_id) query.patient_id = patient_id;
    if (medication) query.medication = medication;

    const prescriptions = await this.prescriptionModel
      .find(query)
      .populate('patient_id')
      .exec();
    return prescriptions.map(this.toPrescriptionDto);
  }

  async findOne(id: string): Promise<PrescriptionDto> {
    const prescription = await this.prescriptionModel
      .findById( id )
      .populate('patient_id')
      .exec();
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    return this.toPrescriptionDto(prescription);
  }

  private toPrescriptionDto(prescription: Prescription): PrescriptionDto {
    return {
      id: prescription.id,
      patient_id: prescription.patient_id,
      medication: prescription.medication,
      dosage: prescription.dosage,
      prescribed_date: prescription.prescribed_date,
    };
  }
}
