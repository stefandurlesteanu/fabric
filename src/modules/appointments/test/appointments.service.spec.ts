import { Test, TestingModule } from '@nestjs/testing';

import { NotFoundException } from '@nestjs/common';
import { AppointmentsService } from '../appointments.service';
import { AppointmentRepository } from '../appointment.repository';
import { PatientsService } from '../../patients/patients.service';


describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let appointmentsRepository: AppointmentRepository;
  let patientsService: PatientsService;

  const mockPatient = {
    id: 123,
    name: 'John Doe',
    age: 30,
    gender: 'male',
    contact: '1234567890',
  };

  const mockAppointment = {
    id: 1,
    patient_id: mockPatient.id,
    doctor: 'Dr. Smith',
    appointment_date: '2024-08-19T10:00:00Z',
    reason: 'Regular check-up',
  };

  const mockAppointmentsRepository = {
    create: jest.fn().mockResolvedValue(mockAppointment),
    find: jest.fn().mockResolvedValue([mockAppointment]),
    findOne: jest.fn().mockResolvedValue(mockAppointment),
  };

  const mockPatientsService = {
    findOne: jest.fn().mockResolvedValue(mockPatient),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: AppointmentRepository,
          useValue: mockAppointmentsRepository,
        },
        {
          provide: PatientsService,
          useValue: mockPatientsService,
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    appointmentsRepository = module.get<AppointmentRepository>(AppointmentRepository);
    patientsService = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an appointment if the patient exists', async () => {
      const createAppointmentData = {
        patient_id: mockPatient.id,
        doctor: 'Dr. Smith',
        appointment_date: '2024-08-19T10:00:00Z',
        reason: 'Regular check-up',
      };

      const result = await service.create(createAppointmentData);

      expect(patientsService.findOne).toHaveBeenCalledWith({ id: mockPatient.id });
      expect(appointmentsRepository.create).toHaveBeenCalledWith(createAppointmentData);
      expect(result).toEqual(mockAppointment);
    });

    it('should throw NotFoundException if the patient does not exist', async () => {
      (patientsService.findOne as jest.Mock).mockResolvedValue(null);

      const createAppointmentData = {
        patient_id: mockPatient.id,
        doctor: 'Dr. Smith',
        appointment_date: '2024-08-19T10:00:00Z',
        reason: 'Regular check-up',
      };

      await expect(service.create(createAppointmentData)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByPatientIdAndDoctor', () => {
    it('should return an array of appointments filtered by patient_id and doctor', async () => {
      const result = await service.findByPatientIdAndDoctor(mockPatient.id, 'Dr. Smith');

      expect(appointmentsRepository.find).toHaveBeenCalledWith({
        patient_id: mockPatient.id,
        doctor: 'Dr. Smith',
      });
      expect(result).toEqual([mockAppointment]);
    });

    it('should return an array of appointments with no filters', async () => {
      const result = await service.findByPatientIdAndDoctor();

      expect(appointmentsRepository.find).toHaveBeenCalledWith({});
      expect(result).toEqual([mockAppointment]);
    });
  });

  describe('findOne', () => {
    it('should return an appointment by ID', async () => {
      const result = await service.findOne({ id: mockAppointment.id });

      expect(appointmentsRepository.findOne).toHaveBeenCalledWith({ id: mockAppointment.id });
      expect(result).toEqual(mockAppointment);
    });

    it('should return null if appointment is not found', async () => {
      (appointmentsRepository.findOne as jest.Mock).mockResolvedValue(null);

      const result = await service.findOne({ id: 999 });

      expect(result).toBeNull();
    });
  });
});
