import { Field, InputType } from "type-graphql";

@InputType()
export class RefreshTheTokenInput {
  @Field()
  refreshToken: string;
}