import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
} from "type-graphql";
import { compare } from "bcryptjs";
import { User } from "../../entity/User";
import { LoginInput } from "./login/LoginInput";

import { MyContext } from "../../types/MyContext";
import { createAccessToken } from "../../util/auth";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver(User)
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() { req, res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    //login success

    console.log(user);

    return {
      accessToken: createAccessToken(user),
    };
  }
}
