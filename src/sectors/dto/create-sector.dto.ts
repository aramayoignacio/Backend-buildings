import { IsNumber, IsString } from "class-validator";

export class CreateSectorDto {
    @IsString()
    readonly name:string;

    @IsNumber()
    readonly floorId: number;
}
