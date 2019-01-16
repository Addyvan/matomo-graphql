const { gql } = require('apollo-server');

const typeDefs = gql`
    
    type Query {
        summary(idSite: IdSiteEnum!, period: PeriodEnum!, date: DateInput!): Summary!
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
        avgTimeOnSite: Int
    }

    input DateInput {
        year: String!
        month: String!
        day: String!
    }

    enum IdSiteEnum {
        all
    }

    enum PeriodEnum {
        day,
        week,
        month,
        year,
        range
    }

`

module.exports = typeDefs;