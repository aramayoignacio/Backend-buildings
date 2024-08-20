import { IsNumber, IsString } from "class-validator";

export class CreateFloorDto {
    @IsString()
    readonly numberInBuilding:string;

    @IsNumber()
    readonly buildingId: number;
}
