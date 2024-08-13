import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppointmentDto } from 'src/appointments/dto/appointment.dto';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentDto> {
    const appointment =
      await this.appointmentsService.create(createAppointmentDto);
    return appointment;
  }

  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @Get()
  findAll(
    @Query('patient_id') patient_id?: string,
    @Query('doctor') doctor?: string,
  ) {
    return this.appointmentsService.findAll(patient_id, doctor);
  }

  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }
}
