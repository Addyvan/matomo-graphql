const { RestAPI } = require('./RestAPI');

const api = new RestAPI("http://0.0.0.0:8000/");

const sites = {
    all: "all"
}

function summary(_, args, context, info) {
    return new Promise ( ( resolve, reject ) => {
        api.query({urlBuilder: api.getSummary, params: {
            token: context.token,
            idSite: sites[args.idSite],
            period: args.period,
            date: args.date
        }}).then(result => result[0][3])
        .then(result => resolve({
            numUniqueVisitors: result["nb_uniq_visitors"],
            numUsers: result["nb_users"],
            numVisits: result["nb_visits"],
            numActions: result["nb_actions"],
            numVisitsConverted: result["nb_visits_converted"],
            bounceCount: result["bounce_count"],
            sumVisitLength: result["sum_visit_length"],
            maxActions: result["max_actions"],
            bounceRate: result["bounce_rate"],
            numActionsPerVisit: result["nb_actions_per_visit"],
            avgTimeOnSite: result["avg_time_on_site"], 
            nb_visits: result["nb_visits"],
        }));
    });
}

function summaryByPage (_, args, context, info) {
    console.log("getPageURLsQuery");
    return new Promise ( ( resolve, reject ) => {
        api.query(api.summaryByPage, {
            token: context.token,
            idSite: args.idSite,
            period: args.period,
            date: args.date,
            pageURL: args.pageURL
        }).then(result => result[0])
        .then(result => resolve({
            nb_visits: result["nb_visits"],
            nb_uniq_visitors: result["nb_unique_visitors"],
            nb_hits: result["nb_hits"],
            sum_time_spent: result["sum_time_spent"],
            entry_nb_uniq_visitors: result["entry_nb_uniq_visitors"],
            entry_nb_visits: result["entry_nb_visits"],
            entry_nb_actions: result["entry_nb_actions"],
            entry_sum_visit_length: result["entry_sum_visit_length"],
            entry_bounce_count: result["entry_bounce_count"],
            exit_nb_uniq_visitors: result["exit_nb_uniq_visitors"],
            exit_nb_visits: result["exit_nb_visits"],
            avg_time_on_page: result["avg_time_on_page"],
            bounce_rate: result["bounce_rate"],
            exit_rate: result["exit_rate"],
            url: result["url"],
            segment: result["segment"]
        }));
    });
}


function summaryByDate (_, args, context, info) {
    console.log("summaryByDate")
    return new Promise ( ( resolve, reject ) => {
        api.query(api.summaryByDate, {
            token: context.token,
            idSite: args.idSite,
            period: args.period,
            pageURL: args.pageURL,
            lastXDays: args.lastXDays
        }).then(result => resolve({
            summary: result
        }));
    });
}



module.exports = {
    summary,
    summaryByPage,
    summaryByDate
};