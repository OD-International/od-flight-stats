const fsConn = require('./connect');
const moment = require('moment');

const FSSDK = function (appId, appKey) {
    this.appId = appId;
    this.appKey = appKey;

    this.lookUp = lookUp.bind(this);
    this.findFlight = findFlightWithKey.bind(this);


};


function lookUp(options = {}) {
    const {airlineCode, flightNumber, date, isArr, isLocalTime} = options;
    if (!airlineCode) throw new Error('CANNOT FIND airlineCode');
    if (!flightNumber) throw new Error('CANNOT FIND flightNumber');
    if (!date) throw new Error('CANNOT FIND date');

    if (!this.appId) throw new Error('CANNOT FIND appId');
    if (!this.appKey) throw new Error('CANNOT FIND appKey');


    try {
        const moDate = moment.utc(date);

        const params = ['flex', 'flightstatus', 'rest', 'v2',
            'json', 'flight', 'status', airlineCode, flightNumber,
            isArr ? 'arr' : 'dep', moDate.format('YYYY/MM/DD')];

        const query = {appId: this.appId, appKey: this.appKey, utc: !isLocalTime};

        return fsConn.fsRequest('GET', params, query, {}, {});

    } catch (e) {
        throw e;
    }
}

function findFlightWithKey(flight_key) {
    if (!this.appId) throw new Error('CANNOT FIND appId');
    if (!this.appKey) throw new Error('CANNOT FIND appKey');

    if (!flight_key) throw new Error('CANNOT FIND FLIGHT KEY');


    try {
        //curl -v  -X GET
        // "https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/1008984817?appId=fe718e2c&appKey=22a93116d60377acad667084cf62368c"
        const params = ['flex', 'flightstatus', 'rest', 'v2',
            'json', 'flight', 'status', flight_key];

        const query = {appId: this.appId, appKey: this.appKey};

        return fsConn.fsRequest('GET', params, query, {}, {});


    } catch (e) {
        throw e;
    }
}


module.exports = FSSDK;