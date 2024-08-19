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
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { FindAppointmentsQueryDto } from './dto/query-appointments.dto';

@Roles(UserRole.ADMIN, UserRole.DOCTOR)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly _appointmentsService: AppointmentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    const appointment = await this._appointmentsService.create(createAppointmentDto);
    return appointment;
  }

  @Get()
  async findAll(@Query() query: FindAppointmentsQueryDto) {
    const { patient_id, doctor } = query;
    const appointments = await this._appointmentsService.findByPatientIdAndDoctor(patient_id, doctor);
    return appointments;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const appointment = await this._appointmentsService.findOne({ id });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }
}
