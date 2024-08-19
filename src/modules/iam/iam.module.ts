import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AuthenticationController } from "./authentication/authentication.controller";
import { AuthenticationService } from "./authentication/authentication.service";
import { AccessTokenGuard } from "./authentication/guards/access-token.guard";
import { AuthenticationGuard } from "./authentication/guards/authentication.guard";
import { SeedService } from "./authentication/seeds/user.seed";
import { RolesGuard } from "./authorization/guards/roles.guard";
import jwtConfig from "./config/jwt.config";
import { BcryptService } from "./hashing/bcrypt.service";
import { HashingService } from "./hashing/hashing.service";


@Module({
  imports: [ConfigModule.forFeature(jwtConfig), JwtModule.registerAsync(jwtConfig.asProvider()), UsersModule],
  exports: [SeedService],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AccessTokenGuard,
    AuthenticationService,
    SeedService
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
