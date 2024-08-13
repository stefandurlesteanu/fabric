import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import {
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patient.entity';

const mockPatient = {
  id: '507f191e810c19729de860ea',
  name: 'John Doe',
  age: 30,
  gender: 'male',
  contact: '123-456-7890',
} as Patient;

const mockAllPatients = [mockPatient];
const mockId = '507f191e810c19729de860ea';
const mockIdError = 'invalid-id';
export const EXCLUDE_FIELDS = '-_id -__v';

class MockedPatientModel {
  constructor(private _: any) {}
  new = jest.fn().mockResolvedValue({});
  static save = jest.fn().mockResolvedValue(mockPatient);
  static find = jest.fn().mockReturnThis();
  static create = jest.fn().mockReturnValue(mockPatient);
  static findOneAndDelete = jest.fn().mockImplementation((id: string) => {
    if (id === mockIdError) throw new NotFoundException();
    return this;
  });
  static exec = jest.fn().mockReturnValue(mockPatient);
  static select = jest.fn().mockReturnThis();
  static findById = jest.fn().mockImplementation((id: string) => {
    if (id === mockIdError) throw new NotFoundException();
    return this;
  });
}

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: getModelToken(Patient.name),
          useValue: MockedPatientModel,
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all patients', async () => {
    jest
      .spyOn(MockedPatientModel, 'exec')
      .mockResolvedValueOnce(mockAllPatients);
    const expectedOutput = await service.findAll();
    expect(MockedPatientModel.find).toHaveBeenCalledTimes(1);
    expect(MockedPatientModel.exec).toHaveBeenCalledTimes(1);
    expect(expectedOutput).toEqual(mockAllPatients);
  });

  describe('Get Patient', () => {
    it('should find patient by id', async () => {
      const expectedOutput = await service.findOne(mockId);
      expect(MockedPatientModel.findById).toHaveBeenCalledTimes(1);
      expect(MockedPatientModel.findById).toBeCalledWith(mockId);
      expect(MockedPatientModel.exec).toHaveBeenCalledTimes(1);
      expect(expectedOutput).toEqual(mockPatient);
    });

    it('should throw BadRequestException for invalid ID format', async () => {
      try {
        await service.findOne(mockIdError);
      } catch (error: any) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual(`Invalid ID format: ${mockIdError}`);
        expect(error.status).toEqual(HttpStatus.BAD_REQUEST);
      }
    });

    it('should throw NotFoundException if patient is not found', async () => {
      jest.spyOn(MockedPatientModel, 'exec').mockResolvedValueOnce(null);

      try {
        await service.findOne(mockId);
      } catch (error: any) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Patient with ID ${mockId} not found`);
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
      }
    });
  });
});
