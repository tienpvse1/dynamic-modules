import { IsEmail, IsString, Length } from 'class-validator';

export class CreateAccountDto {
  @Length(10)
  id: string;
  @IsString()
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
