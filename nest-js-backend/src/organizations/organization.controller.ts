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
import { OrganizationDto } from './organization.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('org')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationServices) {}

  @Get()
  async getAllOrganizations() {
    return this.organizationService.getAllOrganizations();
  }

  @Post()
  async createOrganization(@Body() organizationDto: OrganizationDto) {
    return this.organizationService.createOrganization(organizationDto);
  }

  @Patch(':id')
  async updateOrganization(
    @Param() { id }: any,
    @Body() postDataDto: Organization,
  ) {
    return this.organizationService.updateOrganization(id, postDataDto);
  }

  @Delete(':id')
  async deleteOrganization(@Param() { id }: any) {
    return this.organizationService.deleteOrganization(id);
  }
}
