import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUnitDto {
    @IsString()
    @IsOptional()
    readonly name: string;

    @IsNumber()
    readonly sectorId: number;

    @IsBoolean()
    readonly keys:boolean;

    @IsNumber()
    readonly typeId: number;
}
