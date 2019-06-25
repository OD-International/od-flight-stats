const request = require('request');
const FS_URL = 'https://api.flightstats.com/flex';

const fsRequest = (method, params, headers, body) => {
    let op_url = FS_URL + '/';
    params.forEach(param => {
        op_url += (param + '/');
    });
    let options = {
        method: method,
        url: op_url,
        body: body,
        headers: headers,
        json: true
    };
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (!error) {
                if (body.status === true) {
                    resolve(body.payload ? body.payload : {});
                } else {
                    reject(body.message);
                }
            } else {
                reject(error);
            }
        });
    });
};

module.exports.fsRequest = fsRequest;