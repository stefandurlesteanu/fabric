import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IamModule } from './iam/iam.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    IamModule,
    MongooseModule.forRoot('mongodb://localhost:27018/patients_dev'),
    PatientsModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
