import { Resolver, Mutation, Arg } from "type-graphql";
import { RefreshToken } from "../../entity/RefreshToken";
import { RefreshTheTokenInput } from "./logout/RefreshTheTokenInput";

@Resolver()
export class Logout {
  @Mutation(() => Boolean)
  async logout(
    @Arg("data") { refreshToken }: RefreshTheTokenInput
  ): Promise<Boolean> {
    const rt = await RefreshToken.findOne({
      where: { token: refreshToken },
    });
    if (!rt || new Date() > new Date(rt.expiration))
      throw new Error("Invalid refresh token");

    await RefreshToken.remove(rt);
    console.log(rt);

    return true;
  }
}
