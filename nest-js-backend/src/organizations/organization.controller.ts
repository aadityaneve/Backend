import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService, OrganizationServices } from './organization.service';
import { Organization } from './organization.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationServices) {}

  @Get('/org')
  async getAllOrganizations() {
    return this.organizationService.getAllOrganizations();
  }

  @Post('/org')
  async createOrganization(@Body() organizationDto: Organization) {
    return this.organizationService.createOrganization(organizationDto);
  }

  @Patch('/org/:id')
  async updateOrganization(
    @Param() { id }: any,
    @Body() postDataDto: Organization,
  ) {
    return this.organizationService.updateOrganization(id, postDataDto);
  }

  @Delete('/org/:id')
  async deleteOrganization(@Param() { id }: any) {
    return this.organizationService.deleteOrganization(id);
  }
}
