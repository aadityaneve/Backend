import { Injectable } from '@nestjs/common';
import { Patient } from './interfaces/patient.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class PatientService {
  constructor(
    @InjectModel('Patient') private readonly Patientmodel: Model<Patient>,
  ) {}

  async findAll(): Promise<Patient[]> {
    return await this.Patientmodel.find();
  }
  async findOne(id: string): Promise<Patient> {
    return await this.Patientmodel.findOne({ _id: id });
  }
  async create(patient: Patient): Promise<Patient> {
    const newPatient = new this.Patientmodel(patient);
    return await newPatient.save();
  }
  async delete(id: string): Promise<Patient> {
    return await this.Patientmodel.findByIdAndRemove(id);
  }
  async update(id: string, patient: Patient): Promise<Patient> {
    return await this.Patientmodel.findByIdAndUpdate(id, patient, {
      new: true,
    });
  }
}
