import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PrescriptionDocument = Prescription & Document;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Prescription {
  @Prop({ required: true, default: () => Date.now() * 1000 + Math.floor(Math.random() * 1000) })
  id: number;

  @Prop({ required: true })
  patient_id: number;

  @Prop({ required: true })
  medication: string;

  @Prop({ required: true })
  dosage: string;

  @Prop({ default: () => new Date().toISOString() })
  prescribed_date: string;
}

export const PrescriptionSchema = SchemaFactory.createForClass(Prescription);
PrescriptionSchema.index({ id: 1 });
