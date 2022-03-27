import { sign } from "jsonwebtoken";
import { User } from "../entity/User";
import { RefreshToken } from "../entity/RefreshToken";

export const createAccessToken = (userId: string) =>
  sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });

export const createRefreshToken = async (userId: string, ip: string) => {
  var generatedId =
    new Date().getTime().toString(36) + new Date().getUTCMilliseconds();

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  // date.setSeconds(date.getSeconds() + 15);

  await RefreshToken.create({
    userId: userId,
    token: generatedId,
    expiration: expiration,
    ipAddress: ip,
  }).save();

  return generatedId;
};
