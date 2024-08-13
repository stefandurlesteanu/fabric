import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Roles(UserRole.DOCTOR)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }
}
