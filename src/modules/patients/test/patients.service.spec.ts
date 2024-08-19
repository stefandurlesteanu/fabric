import { Test, TestingModule } from '@nestjs/testing';
import { PatientsRepository } from '../patient.repository';
import { PatientsService } from '../patients.service';
import { Patient } from '../schemas/patient.schema';


describe('PatientsService', () => {
  let service: PatientsService;
  let repository: PatientsRepository;

  const mockPatient = {
    id: 1234567890123,
    name: 'John Doe',
    age: 30,
    gender: 'MALE',
    contact: '1234567890',
  } as Patient;

  const mockPatientsRepository = () => ({
    create: jest.fn().mockResolvedValue(mockPatient),
    findOne: jest.fn().mockResolvedValue(mockPatient),
    find: jest.fn().mockResolvedValue([mockPatient]),
    update: jest.fn(),
    delete: jest.fn().mockResolvedValue(mockPatient),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: PatientsRepository,
          useFactory: mockPatientsRepository,
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    repository = module.get<PatientsRepository>(PatientsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a patient', async () => {
    expect(await service.create(mockPatient)).toEqual(mockPatient);
    expect(repository.create).toHaveBeenCalledWith(mockPatient);
  });

  it('should find one patient', async () => {
    expect(await service.findOne({ id: mockPatient.id })).toEqual(mockPatient);
    expect(repository.findOne).toHaveBeenCalledWith({ id: mockPatient.id });
  });

  it('should find all patients', async () => {
    expect(await service.find({})).toEqual([mockPatient]);
    expect(repository.find).toHaveBeenCalledWith({});
  });

  it('should update a patient', async () => {
    const updatedPatient = { ...mockPatient, name: 'Jane Doe' };
    (repository.update as jest.Mock).mockResolvedValue(updatedPatient);

    expect(await service.update(mockPatient.id.toString(), { name: 'Jane Doe' })).toEqual(updatedPatient);
    expect(repository.update).toHaveBeenCalledWith({ id: mockPatient.id.toString() }, { name: 'Jane Doe' });
  });

  it('should delete a patient', async () => {
    expect(await service.delete(mockPatient.id.toString())).toEqual(mockPatient);
    expect(repository.delete).toHaveBeenCalledWith(mockPatient.id.toString());
  });
});
