import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserRole } from '../../common/enums/user-role.enum';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientsService } from './patients.service';

@Roles(UserRole.ADMIN, UserRole.DOCTOR)
@Controller('patients')
export class PatientsController {
  constructor(private readonly _patientsService: PatientsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPatientDto: CreatePatientDto) {
    return this._patientsService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this._patientsService.find();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const patient = await this._patientsService.findOne({ id });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }
}
