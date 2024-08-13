import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';


@Schema()
export class Prescription extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Patient', required: true })
  patient_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  medication: string;

  @Prop({ required: true })
  dosage: string;

  @Prop({ default: () => new Date().toISOString() })
  prescribed_date: string;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
