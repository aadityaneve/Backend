import {
  IsEmail,
  IsDate,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class OrganizationDto {
  @MinLength(3, {
    message: 'Name is too short',
  })
  name: string;
  @MinLength(3, {
    message: 'Street name is too short',
  })
  street: string;
  @MinLength(3, {
    message: 'City name is too short',
  })
  city: string;
  @MinLength(3, {
    message: 'State name is too short',
  })
  state: string;
  @MinLength(3, {
    message: 'Country name is too short',
  })
  country: string;
  @MinLength(6, {
    message: 'Zip code should be 6 digits',
  })
  @MaxLength(6, {
    message: 'Zip code should be 6 digits',
  })
  zip_code: string;
  @IsEmail()
  email: string;
}
