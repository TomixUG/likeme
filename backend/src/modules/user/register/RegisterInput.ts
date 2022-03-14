import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";
import { IsUsernameAlreadyExist } from "./isUsernameAlreadyExist";

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 30)
  @IsUsernameAlreadyExist({ message: "username taken" })
  username: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({message: "email taken"})
  email: string;

  @Field()
  @Length(6, 255)
  password: string;
}
