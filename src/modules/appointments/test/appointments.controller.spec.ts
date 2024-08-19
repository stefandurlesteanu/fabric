import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AppointmentsController } from '../appointments.controller';
import { AppointmentsService } from '../appointments.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { FindAppointmentsQueryDto } from '../dto/query-appointments.dto';


describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  let service: AppointmentsService;

  const mockAppointment = {
    id: 1,
    patient_id: 123,
    doctor: 'Dr. Smith',
    appointment_date: '2024-08-19T10:00:00Z',
    reason: 'Regular check-up',
  };

  const mockAppointmentsService = {
    create: jest.fn().mockResolvedValue(mockAppointment),
    findByPatientIdAndDoctor: jest.fn().mockResolvedValue([mockAppointment]),
    findOne: jest.fn().mockResolvedValue(mockAppointment),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [
        {
          provide: AppointmentsService,
          useValue: mockAppointmentsService,
        },
      ],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an appointment and return it with a 201 status', async () => {
      const createAppointmentDto: CreateAppointmentDto = {
        patient_id: 123,
        doctor: 'Dr. Smith',
        appointment_date: '2024-08-19T10:00:00Z',
        reason: 'Regular check-up',
      };

      const result = await controller.create(createAppointmentDto);

      expect(service.create).toHaveBeenCalledWith(createAppointmentDto);
      expect(result).toEqual(mockAppointment);
    });
  });

  describe('findAll', () => {
    it('should return an array of appointments with a 200 status', async () => {
      const query: FindAppointmentsQueryDto = {
        patient_id: 123,
        doctor: 'Dr. Smith',
      };

      const result = await controller.findAll(query);

      expect(service.findByPatientIdAndDoctor).toHaveBeenCalledWith(123, 'Dr. Smith');
      expect(result).toEqual([mockAppointment]);
    });

    it('should return an array of appointments without filters', async () => {
      const query: FindAppointmentsQueryDto = {};

      const result = await controller.findAll(query);

      expect(service.findByPatientIdAndDoctor).toHaveBeenCalledWith(undefined, undefined);
      expect(result).toEqual([mockAppointment]);
    });
  });

  describe('findOne', () => {
    it('should return an appointment by ID with a 200 status', async () => {
      const result = await controller.findOne(1);

      expect(service.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockAppointment);
    });

    it('should throw a NotFoundException if appointment is not found', async () => {
      (service.findOne as jest.Mock).mockResolvedValue(null);

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
