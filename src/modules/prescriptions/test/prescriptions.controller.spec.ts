import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePrescriptionDto } from '../dto/create-prescription.dto';
import { FindPrescriptionsQueryDto } from '../dto/query-prescriptions.dto';
import { PrescriptionsController } from '../prescriptions.controller';
import { PrescriptionsService } from '../prescriptions.service';

describe('PrescriptionsController', () => {
  let controller: PrescriptionsController;
  let service: PrescriptionsService;

  const mockPrescription = {
    id: 1,
    patient_id: 123,
    medication: 'Medicine A',
    dosage: '2 pills a day',
    prescribed_date: '2024-08-19T00:00:00Z',
  };

  const mockPrescriptionsService = {
    create: jest.fn().mockResolvedValue(mockPrescription),
    findByPatientIdAndMedication: jest.fn().mockResolvedValue([mockPrescription]),
    findOne: jest.fn().mockResolvedValue(mockPrescription),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionsController],
      providers: [
        {
          provide: PrescriptionsService,
          useValue: mockPrescriptionsService,
        },
      ],
    }).compile();

    controller = module.get<PrescriptionsController>(PrescriptionsController);
    service = module.get<PrescriptionsService>(PrescriptionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a prescription and return it with a 201 status', async () => {
      const createPrescriptionDto: CreatePrescriptionDto = {
        patient_id: 123,
        medication: 'Medicine A',
        dosage: '2 pills a day'
      };

      const result = await controller.create(createPrescriptionDto);

      expect(service.create).toHaveBeenCalledWith(createPrescriptionDto);
      expect(result).toEqual(mockPrescription);
    });
  });

  describe('findAll', () => {
    it('should return an array of prescriptions with a 200 status', async () => {
      const query: FindPrescriptionsQueryDto = {
        patient_id: 123,
        medication: 'Medicine A',
      };

      const result = await controller.findAll(query);

      expect(service.findByPatientIdAndMedication).toHaveBeenCalledWith(123, 'Medicine A');
      expect(result).toEqual([mockPrescription]);
    });

    it('should return an array of prescriptions without filters', async () => {
      const query: FindPrescriptionsQueryDto = {};

      const result = await controller.findAll(query);

      expect(service.findByPatientIdAndMedication).toHaveBeenCalledWith(undefined, undefined);
      expect(result).toEqual([mockPrescription]);
    });
  });

  describe('findOne', () => {
    it('should return a prescription by ID with a 200 status', async () => {
      const result = await controller.findOne(1);

      expect(service.findOne).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockPrescription);
    });

    it('should throw a NotFoundException if prescription is not found', async () => {
      (service.findOne as jest.Mock).mockResolvedValue(null);

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
