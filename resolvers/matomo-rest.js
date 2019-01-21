const fetch = require('node-fetch');

class MatomoAPI  {
    constructor() {
        this.baseURL = 'http://0.0.0.0:8000/';
    }
  
    async getSummary(params) {
        console.log("getSummary")
        var url = this.baseURL + '?module=API&method=API.getBulkRequest&format=json&urls[0]=method%3dVisitsSummary.get&idSite='+ params.idSite +'&date='+ params.date.year +'-'+ params.date.month +'-'+ params.date.day +'&period='+ params.period +'&token_auth=' + params.token;
        return new Promise( ( resolve, reject ) => {
            fetch( url )
                .then(response => {return response.json()} )
                .then(result => {resolve(result[0][3])});
        }).catch(() => {assert.isNotOk(error,'Promise error')});
    }

    async getPageURL(params) {
        console.log("getPageURLsMatomoRest")
        var urlPageData = this.baseURL + '?module=API&method=Actions.getPageUrl&pageUrl='+ params.pageURL +'&idSite=3&period='+ params.period+'&date='+ params.date.year +'-'+ params.date.month +'-'+ params.date.day +'&format=JSON&token_auth=' + params.token;
        console.log(urlPageData)
        return new Promise( ( resolve, reject ) => {
            fetch( urlPageData )
                .then(response => {return response.json()} )
                .then(result => {console.log(result);resolve(result[0])});
        }).catch(() => {assert.isNotOk(error,'Promise error')});
    }

};

module.exports = {
    MatomoAPI
};