import { buildSchema } from "type-graphql";

import { RegisterResolver } from "../modules/user/Register";
import { LoginResolver } from "../modules/user/Login";
import { UserInfoResolver } from "../modules/user/UserInfo";
import { RefreshTheToken } from "../modules/user/RefreshTheToken";
import { Logout } from "../modules/user/Logout";

export const createSchema = () => {
  return buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      UserInfoResolver,
      RefreshTheToken,
      Logout,
    ],
  });
};
