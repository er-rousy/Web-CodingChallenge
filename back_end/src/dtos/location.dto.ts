import { IsString, IsArray } from 'class-validator';

 class LocationDto {
    @IsString()
    public type: string;

    @IsArray()
    public coordinates: any[];
}

export default LocationDto;