import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { Organization, OrganizationDocument } from './organization.model.ts';
import { Model } from 'mongoose';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class OrganizationServices {
  constructor(
    @InjectModel('organization')
    private readonly organizationModel: Model<OrganizationDocument>,
  ) {}

  // Fetching all Organizations
  async getAllOrganizations(): Promise<Organization[]> {
    return this.organizationModel.find().exec();
  }

  // Creating a Organization
  async createOrganization(organization: Organization): Promise<Organization> {
    const newOrganization = new this.organizationModel(organization);
    return newOrganization.save();
  }
}
