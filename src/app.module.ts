import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRole } from './common/enums/user-role.enum';
import { SeedService } from './modules/iam/authentication/seeds/user.seed';
import { IamModule } from './modules/iam/iam.module';
import { PatientsModule } from './modules/patients/patients.module';
import { PrescriptionsModule } from './modules/prescriptions/prescriptions.module';
import { UsersModule } from './modules/users/users.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    IamModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    PatientsModule,
    AppointmentsModule,
    PrescriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.seedInitialUser(UserRole.ADMIN, 'admin@example.com');
    await this.seedService.seedInitialUser(UserRole.DOCTOR, 'doctor@example.com');
  }
}
