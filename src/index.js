const { ApolloServer } = require("apollo-server");
const Query = require("./resolvers/Query");
const apolloSchema = require("./schema");
require("dotenv").config();

const resolvers = {
  Query
}

const env = process.env;

const server = new ApolloServer({
  typeDefs: apolloSchema,
  resolvers,
  context: ({req}) => ({
    ...req,
    token: env.MATOMO_TOKEN
  }),
});

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
};

server.listen(options).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});