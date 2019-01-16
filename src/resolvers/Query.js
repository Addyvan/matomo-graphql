const { MatomoAPI } = require('./matomo-rest');

const api = new MatomoAPI();

const sites = {
    all: "all"
}

function summary(_, args, context, info) {
    console.log(args);
    return new Promise ( ( resolve, reject ) => {
        api.getSummary({
            token: context.token,
            idSite: sites[args.idSite],
            period: args.period,
            date: args.date
        }).then(result => resolve({
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
            avgTimeOnSite: result["avg_time_on_site"]
        }));
        
    });
}

module.exports = {
    summary
};