import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Appointment extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Patient', required: true })
  patient_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  doctor: string;

  @Prop({ required: true })
  appointment_date: string;

  @Prop({ required: true })
  reason: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
