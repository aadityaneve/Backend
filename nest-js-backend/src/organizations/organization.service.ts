import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { Organization, OrganizationDocument } from './organization.model';
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
    return this.organizationModel.find({}).exec();
  }

  // Creating an Organization
  async createOrganization(organization: Organization): Promise<Organization> {
    const newOrganization = new this.organizationModel(organization);
    return newOrganization.save();
  }

  // Updating an Organization
  async updateOrganization(id: string, postDataDto: Organization) {
    const org = await this.organizationModel.updateOne(
      { _id: id },
      postDataDto,
      { new: true },
    );
    if (!org) throw new NotFoundException();
    return org;
  }

  // Deleting an Organization
  async deleteOrganization(id: string) {
    const deletedOrg = await this.organizationModel.deleteOne(
      { _id: id },
      { new: true },
    );
    if (!deletedOrg) throw new NotFoundException();
    return deletedOrg;
  }
}
