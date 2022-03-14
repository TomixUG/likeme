import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { isAuth } from "../../util/isAuthMiddleware";

@Resolver()
export class UserInfoResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  async userInfo(@Ctx() { payload }: MyContext): Promise<String> {
    // const user = await User.findOne({ where: { payload.userId } });

    return payload.userId;
  }
}
