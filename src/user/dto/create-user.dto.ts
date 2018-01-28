import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()	
  readonly name: string;

  @IsEmail({}, { message: 'Is not a valid email' })
  @IsNotEmpty()	
  readonly email: string;

  @IsString()
  @IsNotEmpty()	
  public password: string;
}