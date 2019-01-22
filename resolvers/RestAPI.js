const fetch = require('node-fetch');

class RestAPI  {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
  
    getSummary(params) {
        return('?module=API&method=API.getBulkRequest&format=json&urls[0]=method%3dVisitsSummary.get&idSite='+ params.idSite +'&date='+ params.date.year +'-'+ params.date.month +'-'+ params.date.day +'&period='+ params.period +'&token_auth=' + params.token);
    }

    summaryByPage(params) {
        if (params.idSite == "three"){
            params.idSite = "3";
        }
        return('?module=API&method=Actions.getPageUrl&pageUrl='+ params.pageURL +'&idSite='+ params.idSite +'&period='+ params.period+'&date='+ params.date.year +'-'+ params.date.month +'-'+ params.date.day +'&format=JSON&token_auth=' + params.token);
    }

    summaryByDate(params) {
        if (params.pageURL === undefined){
            //need to give a site or function returns nothing
            params.pageURL = "http://example.org/index.htm";
        }
        if (params.idSite == "three"){
            params.idSite = "3";
        }
        return('?module=API&method=Actions.getPageUrl&pageUrl='+ params.pageURL +'&idSite='+ params.idSite +'&period='+ params.period+'&date=last'+ params.lastXDays +'&format=JSON&token_auth=' + params.token);
    }

    query(input) {
        var url = input.urlBuilder(input.params);
        console.log("URL: " + url);
        return new Promise( ( resolve, reject ) => {
            fetch( this.endpoint + url )
                .then(response => {
                    return response.json()
                })
                .then(result => {resolve(result)});
            }).catch(() => {assert.isNotOk(error,'Promise error')});
    }


};

module.exports = {
    RestAPI
};