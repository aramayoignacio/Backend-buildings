import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class CreateGarageDto {
    @IsBoolean()
    readonly covered: boolean;

    @IsBoolean()
    readonly fixed: boolean;

    @IsBoolean()
    readonly storage: boolean;

    @IsNumber()
    readonly numberInBuilding: number;

    @IsNumber()
    readonly buildingId: number;

    @IsNumber()
    @IsOptional()
    readonly unitId: number;
}
