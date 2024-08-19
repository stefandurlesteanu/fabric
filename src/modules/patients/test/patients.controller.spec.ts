import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { Gender } from '../enums/gender.enum';
import { PatientsController } from '../patients.controller';
import { PatientsService } from '../patients.service';

describe('PatientsController', () => {
  let controller: PatientsController;
  let service: PatientsService;

  const mockPatient = {
    id: 1,
    name: 'John Doe',
    age: 30,
    gender: 'male',
    contact: '1234567890',
  };

  const mockPatientsService = {
    create: jest.fn().mockResolvedValue(mockPatient),
    find: jest.fn().mockResolvedValue([mockPatient]),
    findOne: jest.fn().mockResolvedValue(mockPatient),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
        {
          provide: PatientsService,
          useValue: mockPatientsService,
        },
      ],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a patient and return it with a 201 status', async () => {
      const createPatientDto: CreatePatientDto = {
        name: 'John Doe',
        age: 30,
        gender: Gender.MALE,
        contact: '1234567890',
      };

      const result = await controller.create(createPatientDto);

      expect(result).toEqual(mockPatient);
      expect(service.create).toHaveBeenCalledWith(createPatientDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of patients with a 200 status', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([mockPatient]);
      expect(service.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a patient by ID with a 200 status', async () => {
      const result = await controller.findOne(mockPatient.id);

      expect(result).toEqual(mockPatient);
      expect(service.findOne).toHaveBeenCalledWith({ id: mockPatient.id });
    });

    it('should throw a NotFoundException if patient is not found', async () => {
      (service.findOne as jest.Mock).mockResolvedValue(null);

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
