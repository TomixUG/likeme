import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { hash } from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {

  @Query(() => [User])
  async users() {
    return User.find();
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { username, email, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    }).save();

    console.log(user);

    return user;
  }
}
