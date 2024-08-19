import { IsNumber, IsString } from "class-validator";

export class CreateBuildingDto {
    @IsString()
    readonly name: string;
  
    @IsString()
    readonly address: string;

    @IsNumber()
    readonly floors: number;
}
