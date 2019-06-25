const fsConn = require('./connect');
const md5 = require('md5');
const moment = require('moment');

//https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/AA/100/dep/2019/06/25?appId=fe718e2c&appKey=22a93116d60377acad667084cf62368c&utc=true"
//https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/AA/100/dep/2019/05/25/appId=fe718e2c&appKey=22a93116d60377acad667084cf62368c&utc=true
const FSSDK = function (appId, appKey) {
    this.appId = appId;
    this.appKey = appKey;

    this.lookUp = lookUp.bind(this);


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
            isArr ? 'arr' : 'dep',moDate.format('YYYY/MM/DD') ];

        const query = {appId: this.appId, appKey: this.appKey, utc: !isLocalTime};

        return fsConn.fsRequest('GET', params, query, {}, {});

    } catch (e) {
        throw e;
    }

}


module.exports = FSSDK;