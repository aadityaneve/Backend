export class CreatePatientDto {
  readonly name: string;
  readonly DateOfBirth: string;
  readonly Address: string;
  readonly Contact: number;
  readonly Email: string;
  readonly comorbidity: string;
  readonly CurrentDisease: string;
}
