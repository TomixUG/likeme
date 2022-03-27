import { Resolver, Mutation, Arg, Ctx, InputType, Field } from "type-graphql";
import { LoginResponse } from "./login/LoginResponse";
import { User } from "../../entity/User";
import { RefreshToken } from "../../entity/RefreshToken";
import { RefreshTheTokenInput } from "./logout/RefreshTheTokenInput";

import { MyContext } from "../../types/MyContext";
import { createAccessToken, createRefreshToken } from "../../util/auth";

@Resolver()
export class RefreshTheToken {
  @Mutation(() => LoginResponse)
  async refreshToken(
    @Arg("data") { refreshToken }: RefreshTheTokenInput,
    @Ctx() { req, res }: MyContext
  ): Promise<LoginResponse | any> {
    const rt = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (!rt || new Date() > new Date(rt.expiration))
      throw new Error("Invalid refresh token");

    await RefreshToken.remove(rt);

    console.log(rt);

    return {
      accessToken: createAccessToken(rt.userId),
      refreshToken: createRefreshToken(rt.userId, req.ip),
    };
  }
}
