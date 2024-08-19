import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PrescriptionsService } from '../prescriptions.service';
import { PrescriptionRepository } from '../prescription.repository';
import { PatientsService } from '../../patients/patients.service';

describe('PrescriptionsService', () => {
  let service: PrescriptionsService;
  let prescriptionsRepository: PrescriptionRepository;
  let patientsService: PatientsService;

  const mockPatient = {
    id: 1,
    name: 'John Doe',
    age: 30,
    gender: 'male',
    contact: '1234567890',
  };

  const mockPrescription = {
    id: 1,
    patient_id: mockPatient.id,
    medication: 'Medicine A',
    dosage: '2 pills a day',
    prescribed_date: '2024-08-19T00:00:00Z',
  };

  const mockPrescriptionsRepository = {
    create: jest.fn().mockResolvedValue(mockPrescription),
    find: jest.fn().mockResolvedValue([mockPrescription]),
    findOne: jest.fn().mockResolvedValue(mockPrescription),
  };

  const mockPatientsService = {
    findOne: jest.fn().mockResolvedValue(mockPatient),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrescriptionsService,
        {
          provide: PrescriptionRepository,
          useValue: mockPrescriptionsRepository,
        },
        {
          provide: PatientsService,
          useValue: mockPatientsService,
        },
      ],
    }).compile();

    service = module.get<PrescriptionsService>(PrescriptionsService);
    prescriptionsRepository = module.get<PrescriptionRepository>(PrescriptionRepository);
    patientsService = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a prescription if the patient exists', async () => {
      const createPrescriptionData = {
        patient_id: mockPatient.id,
        medication: 'Medicine A',
        dosage: '2 pills a day',
        prescribed_date: '2024-08-19T00:00:00Z',
      };

      const result = await service.create(createPrescriptionData);

      expect(patientsService.findOne).toHaveBeenCalledWith({ id: mockPatient.id });
      expect(prescriptionsRepository.create).toHaveBeenCalledWith(createPrescriptionData);
      expect(result).toEqual(mockPrescription);
    });

    it('should throw NotFoundException if the patient does not exist', async () => {
      (patientsService.findOne as jest.Mock).mockResolvedValue(null);

      const createPrescriptionData = {
        patient_id: mockPatient.id,
        medication: 'Medicine A',
        dosage: '2 pills a day',
        prescribed_date: '2024-08-19T00:00:00Z',
      };

      await expect(service.create(createPrescriptionData)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByPatientIdAndMedication', () => {
    it('should return an array of prescriptions filtered by patient_id and medication', async () => {
      const result = await service.findByPatientIdAndMedication(mockPatient.id, 'Medicine A');

      expect(prescriptionsRepository.find).toHaveBeenCalledWith({
        patient_id: mockPatient.id,
        medication: 'Medicine A',
      });
      expect(result).toEqual([mockPrescription]);
    });

    it('should return an array of prescriptions with no filters', async () => {
      const result = await service.findByPatientIdAndMedication();

      expect(prescriptionsRepository.find).toHaveBeenCalledWith({});
      expect(result).toEqual([mockPrescription]);
    });
  });

  describe('findOne', () => {
    it('should return a prescription by ID', async () => {
      const result = await service.findOne({ id: mockPrescription.id });

      expect(prescriptionsRepository.findOne).toHaveBeenCalledWith({ id: mockPrescription.id });
      expect(result).toEqual(mockPrescription);
    });

    it('should return null if prescription is not found', async () => {
      (prescriptionsRepository.findOne as jest.Mock).mockResolvedValue(null);

      const result = await service.findOne({ id: 999 });

      expect(result).toBeNull();
    });
  });
});
