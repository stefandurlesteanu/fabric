import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Appointment {
  @Prop({ required: true, default: () => Date.now() * 1000 + Math.floor(Math.random() * 1000) })
  id: number;

  @Prop({ required: true })
  patient_id: number;

  @Prop({ required: true })
  doctor: string;

  @Prop({ required: true })
  appointment_date: string;

  @Prop({ required: true })
  reason: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
AppointmentSchema.index({ id: 1 });
