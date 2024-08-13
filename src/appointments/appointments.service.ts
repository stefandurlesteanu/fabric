import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Patient } from 'src/patients/entities/patient.entity';
import { AppointmentDto } from './dto/appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<Appointment>,
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentDto> {
    const patientExists = await this.patientModel.exists({
      _id: createAppointmentDto.patient_id,
    });
    if (!patientExists) {
      throw new NotFoundException(
        `Patient with ID ${createAppointmentDto.patient_id} not found`,
      );
    }

    const createdAppointment = new this.appointmentModel(createAppointmentDto);
    const savedAppointment = await createdAppointment.save();
    return this.toAppointmentDto(savedAppointment);
  }

  async findAll(
    patient_id?: string,
    doctor?: string,
  ): Promise<AppointmentDto[]> {
    const query: any = {};
    if (patient_id) query.patient_id = patient_id;
    if (doctor) query.doctor = doctor;

    const appointments = await this.appointmentModel
      .find(query)
      .populate('patient_id')
      .exec();
    return appointments.map(this.toAppointmentDto);
  }

  async findOne(id: string): Promise<AppointmentDto> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const appointment = await this.appointmentModel
      .findById(id)
      .populate('patient_id')
      .exec();
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return this.toAppointmentDto(appointment);
  }

  private toAppointmentDto(appointment: Appointment): AppointmentDto {
    return {
      id: appointment.id,
      patient_id: appointment.patient_id,
      doctor: appointment.doctor,
      appointment_date: appointment.appointment_date,
      reason: appointment.reason,
    };
  }
}
