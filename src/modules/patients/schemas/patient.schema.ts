import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from '../enums/gender.enum';

export type PatientDocument = Patient & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Patient {
  @Prop({ required: true, default: () => Date.now() * 1000 + Math.floor(Math.random() * 1000) })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, enum: Gender })
  gender: Gender;

  @Prop({ required: true })
  contact: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
PatientSchema.index({ id: 1 });
