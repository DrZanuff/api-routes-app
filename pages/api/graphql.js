import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import Cors from "micro-cors";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default cors(async (req, res) => {

  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});
