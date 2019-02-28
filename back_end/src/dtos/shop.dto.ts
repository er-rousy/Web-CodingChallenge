import { IsString, IsEmail, ValidateNested } from 'class-validator';
import LocationDto from './location.dto'
class CreateShopDto {

    @IsString()
    public picture: string;

    @IsString()
    public name: string;

    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    public city: string;


    @ValidateNested()
    public location: LocationDto
}

export default CreateShopDto;