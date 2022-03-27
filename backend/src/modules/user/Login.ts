import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { compare } from "bcryptjs";
import { LoginResponse } from "./login/LoginResponse";
import { User } from "../../entity/User";
import { LoginInput } from "./login/LoginInput";

import { MyContext } from "../../types/MyContext";
import { createAccessToken, createRefreshToken } from "../../util/auth";

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() { req, res }: MyContext
  ): Promise<LoginResponse|any> {
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
      accessToken: createAccessToken(user.id),
      refreshToken: createRefreshToken(user.id, req.ip),
    };
  }
}
