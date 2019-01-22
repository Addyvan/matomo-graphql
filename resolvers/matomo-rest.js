const fetch = require('node-fetch');

class MatomoAPI  {
    constructor() {
        this.baseURL = 'http://0.0.0.0:8000/';
    }
  
    async getSummary(params) {
        console.log("getSummary")
        console.log(params)
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
        console.log("getPageURLsMatomoRest")
        var url = this.baseURL + '?module=API&method=Actions.getPageUrl&pageUrl='+ params.pageURL +'&idSite=3&period='+ params.period+'&date='+ params.date.year +'-'+ params.date.month +'-'+ params.date.day +'&format=JSON&token_auth=' + params.token;
        return new Promise( ( resolve, reject ) => {
            fetch( url )
                .then(response => {return response.json()} )
                .then(result => {console.log(result);resolve(result[0])});
        }).catch(() => {assert.isNotOk(error,'Promise error')});
    }

    async summaryByDate(params) {
        console.log("summaryByDateRest")
        // var url = this.baseURL + '?module=API&method=Actions.getPageUrl&pageUrl='+ params.pageURL +'&idSite=3&period='+ params.period+'&date='+ params.date.year +'-'+ params.date.month +'-'+ params.date.day +'&format=JSON&token_auth=' + params.token;
        var url = "http://localhost:8000/index.php?module=API&method=VisitsSummary.get&idSite=3&pageUrl=http://example.org/index.htm&period=day&date=last10&format=JSON&token_auth=1f7fddf485936d4690098f72b95a33de";
        console.log(url)
        return new Promise( ( resolve, reject ) => {
            fetch( url )
                .then(response => {return response.json()} )
                .then(result => {console.log(result);resolve(result[0])});
        }).catch(() => {assert.isNotOk(error,'Promise error')});
    }

};

module.exports = {
    MatomoAPI
};