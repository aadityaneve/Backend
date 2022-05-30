import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { get } from 'http';
import { AppService, OrganizationServices } from './app.service';
import { Organization } from './organization.model.ts';

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
    @Param() { id }: id,
    @Body() postData: Organization,
  ) {
    return this.organizationService.update(id, postData);
  }
}
