import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly buildingIds: number[];
}
