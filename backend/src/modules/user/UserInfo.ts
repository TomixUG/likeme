import { Ctx, Field, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { isAuth } from "../../util/isAuthMiddleware";

@ObjectType()
class UInfo {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;
}

@Resolver()
export class UserInfoResolver {
  @Query(() => UInfo)
  @UseMiddleware(isAuth)
  async userInfo(@Ctx() { payload }: MyContext): Promise<UInfo> {
    const user = await User.findOne({ where: { id: payload.userId } });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
