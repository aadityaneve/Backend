import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Put,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';
import { Patient } from './interfaces/patient.interface';
@Controller('patient')
export class PatientController {
  constructor(private readonly patientservice: PatientService) {}
  @Get()
  async findall(): Promise<Patient[]> {
    return this.patientservice.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id): Promise<Patient> {
    return this.patientservice.findOne(id);
  }
  @Post()
  create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientservice.create(createPatientDto);
  }
  @Delete(':id')
  delete(@Param('id') id): Promise<Patient> {
    return this.patientservice.delete(id);
  }
  @Put(':id')
  update(
    @Body() updatePatientDto: CreatePatientDto,
    @Param('id') id,
  ): Promise<Patient> {
    return this.patientservice.update(id, updatePatientDto);
  }
}
