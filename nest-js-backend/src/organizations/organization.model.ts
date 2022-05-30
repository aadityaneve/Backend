/* This is a Schema just like our Mongoose Schema */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrganizationDocument = Organization & Document;

@Schema()
export class Organization {
  @Prop()
  name: string;
  @Prop()
  street: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  country: string;
  @Prop()
  zip_code: string;
  @Prop()
  email: string;
  @Prop({ default: Date.now })
  date: Date;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
