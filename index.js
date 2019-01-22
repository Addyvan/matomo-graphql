const { ApolloServer } = require("apollo-server");
const Query = require("./resolvers/Query");
// const schemaString = require("./schema");
require("dotenv").config();
const { gql } = require('apollo-server');
const GraphQLJSON = require('graphql-type-json');

const schemaString = gql`

    scalar JSON
    
    type Query {
        summary(idSite: IdSiteEnum, period: PeriodEnum, date: DateInput): Summary!
        summaryByPage (idSite: IdSiteEnum, period: PeriodEnum!, date: DateInput!, pageURL: String!): SummaryByPage!,
        summaryByDate (idSite: IdSiteEnum, 
                      period: PeriodEnum!, 
                      pageURL: String, 
                      lastXDays: Int): SummaryByDate
    }

    type SummaryByPage{
        sum_time_spent: Int,
        entry_nb_uniq_visitors: Int,
        entry_nb_visits: String,
        entry_nb_actions: String,
        entry_sum_visit_length: String,
        entry_bounce_count: String,
        exit_nb_uniq_visitors: String,
        exit_nb_visits: String,
        avg_time_on_page: Int,
        bounce_rate: String,
        exit_rate: String,
        url: String,
        segment: String
    }

    type Summary {
        numUniqueVisitors: Int
        numUsers: Int
        numVisits: Int
        numActions: Int
        numVisitsConverted: Int
        bounceCount: Int
        sumVisitLength: Int
        maxActions: Int
        bounceRate: String
        numActionsPerVisit: Float
        avgTimeOnSite: Int,
        sum_time_spent: Int        
    }

    type SummaryByDate {
        summary: JSON
    }

    input DateInput {
        year: String! 
        month: String!
        day: String! 
    }

    enum IdSiteEnum {
        all
        three
    }

    enum PeriodEnum {
        day,
        week,
        month,
        year,
        range
    }

`;

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
  }),
});

const options = {
  port: 4002,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
};

server.listen(options).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});