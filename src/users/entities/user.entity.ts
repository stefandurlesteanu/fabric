import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum UserRole {
  ADMIN = 'admin',
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  DEFAULT = "default"
}

@Schema()
export class User extends Document {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.DEFAULT,
    required: true,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
