import * as mongoose from 'mongoose';

export const PatientSchema = new mongoose.Schema({
  name: String,
  DateOfBirth: String,
  Address: String,
  Contact: Number,
  Email: String,
  comorbidity: String,
  CurrentDisease: String,
});
