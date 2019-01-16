const fetch = require('node-fetch');

class MatomoAPI  {
    constructor() {
        this.baseURL = 'http://0.0.0.0:8000/';
    }
  
    async getSummary(params) {
        var url = this.baseURL + '?module=API&method=API.getBulkRequest&format=json&urls[0]=method%3dVisitsSummary.get&idSite='+ params.idSite +'&date='+ params.date.year +'-'+ params.date.month +'-'+ params.date.day +'&period='+ params.period +'&token_auth=' + params.token;
        return new Promise( ( resolve, reject ) => {
            fetch( url )
                .then(response => {return response.json()} )
                .then(result => {console.log(result);resolve(result[0]["1"])});
        });
    }

};

module.exports = {
    MatomoAPI
};