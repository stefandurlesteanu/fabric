import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { UserRole } from '../users/schemas/user.schema';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { FindPrescriptionsQueryDto } from './dto/query-prescriptions.dto';
import { PrescriptionsService } from './prescriptions.service';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly _prescriptionsService: PrescriptionsService) {}

  @Roles(UserRole.DOCTOR)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    const prescription = await this._prescriptionsService.create(createPrescriptionDto);
    return prescription;
  }

  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @Get()
  async findAll(@Query() query: FindPrescriptionsQueryDto) {
    const { patient_id, medication } = query;
    const prescriptions = await this._prescriptionsService.findByPatientIdAndMedication(patient_id, medication);
    return prescriptions;
  }

  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const prescription = await this._prescriptionsService.findOne({ id });

    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }

    return prescription;
  }
}
