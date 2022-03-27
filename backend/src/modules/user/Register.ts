import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { hash } from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { LoginResponse } from "./login/LoginResponse";
import { createAccessToken, createRefreshToken } from "../../util/auth";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class RegisterResolver {
  @Mutation(() => LoginResponse)
  async register(
    @Arg("data") { username, email, password }: RegisterInput,
    @Ctx() { req, res }: MyContext
  ): Promise<LoginResponse|any> {
    const hashedPassword = await hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    }).save();

    console.log(user);

    return {
      accessToken: createAccessToken(user.id),
      refreshToken: createRefreshToken(user.id, req.ip),
    };
  }
}
