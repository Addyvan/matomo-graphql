const { gql } = require('apollo-server');

const schemaString = gql`

    scalar JSON
    
    type Query {
        summary(idSite: IdSiteEnum, 
                period: PeriodEnum, 
                date: DateInput): Summary!
        summaryByPage (idSite: Int, 
                        period: PeriodEnum!, 
                        date: DateInput!, 
                        pageURL: String!): SummaryByPage!,
        summaryByDate (idSite: IdSiteEnum, 
                      period: PeriodEnum!, 
                      pageURL: String, 
                      lastXDays: Int): SummaryByDate!
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
        #three can be changed to the name of a site by changing 
        #the if block in summaryByDate function in matomo-rest 
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

module.exports = schemaString;
