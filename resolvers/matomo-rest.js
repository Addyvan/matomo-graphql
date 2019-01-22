const fetch = require('node-fetch');

class MatomoAPI  {
    constructor() {
        this.baseURL = 'http://0.0.0.0:8000/';
    }
  
    async getSummary(params) {
        if (params.pageURL === undefined && params.dateString === undefined){
            var url = this.baseURL + '?module=API&method=API.getBulkRequest&format=json&urls[0]=method%3dVisitsSummary.get&idSite='+ params.idSite +'&date='+ params.date.year +'-'+ params.date.month +'-'+ params.date.day +'&period='+ params.period +'&token_auth=' + params.token;
            return new Promise( ( resolve, reject ) => {
            fetch( url )
                .then(response => {return response.json()} )
                .then(result => {resolve(result[0][3])});
            }).catch(() => {assert.isNotOk(error,'Promise error')});
        }
    }

    async summaryByPage(params) {
        if (params.idSite == "three"){
            params.idSite = "3"
        }
        var url = this.baseURL + '?module=API&method=Actions.getPageUrl&pageUrl='+ params.pageURL +'&idSite='+ params.idSite +'&period='+ params.period+'&date='+ params.date.year +'-'+ params.date.month +'-'+ params.date.day +'&format=JSON&token_auth=' + params.token;
        return new Promise( ( resolve, reject ) => {
            fetch( url )
                .then(response => {return response.json()} )
                .then(result => {resolve(result[0])});
        }).catch(() => {assert.isNotOk(error,'Promise error')});
    }

    async summaryByDate(params) {
        if (params.pageURL === undefined){
            //need to give a site or function returns nothing
            params.pageURL = "http://example.org/index.htm"
        }
        if (params.idSite == "three"){
            params.idSite = "3"
        }
        var url = this.baseURL + '?module=API&method=Actions.getPageUrl&pageUrl='+ params.pageURL +'&idSite='+ params.idSite +'&period='+ params.period+'&date=last'+ params.lastXDays +'&format=JSON&token_auth=' + params.token;
        return new Promise( ( resolve, reject ) => {
            fetch( url )
                .then(response => {return response.json()} )
                .then(result => {resolve(result)});
        }).catch(() => {assert.isNotOk(error,'Promise error')});
    }
};

module.exports = {
    MatomoAPI
};