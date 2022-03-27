import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import * as express from "express";
import { createSchema } from "./util/createSchema";


async function main() {
  await createConnection();

  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: ({ req, res }) => ({ req, res }),
  });

  await server.start();
  const app = express();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log("Server listening at http://localhost:4000/graphql");
  });
}

main();
