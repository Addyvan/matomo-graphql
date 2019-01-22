const { ApolloServer, ApolloError } = require("apollo-server");
const Query = require("./resolvers/Query");
const schemaString = require("./schema");
const GraphQLJSON = require('graphql-type-json');
require("dotenv").config();

const resolvers = {
  Query,
  JSON: GraphQLJSON
}

const env = process.env;

const server = new ApolloServer({
  typeDefs: schemaString,
  resolvers,
  context: ({req}) => ({
    ...req,
    token: env.MATOMO_TOKEN
  })
});

const options = {
  port: 4003,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
};

server.listen(options).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});