import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from "../../../common/enums/user-role.enum";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true, default: uuidv4 })
  id: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [String],
    enum: UserRole,
    default: UserRole.DEFAULT,
    required: true,
  })
  roles: UserRole[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 });
UserSchema.index({ id: 1 });
export { UserRole };

