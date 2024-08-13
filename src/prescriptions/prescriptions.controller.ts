import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { PrescriptionsService } from './prescriptions.service';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Roles(UserRole.DOCTOR)
  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @Get()
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionsService.findOne(id);
  }
}
