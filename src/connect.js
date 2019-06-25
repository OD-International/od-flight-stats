const request = require('request');
const FS_URL = 'https://api.flightstats.com';


const fsRequest = (method, params = {}, query = {}, headers = {}, body = {}) => {
    //URL
    let url = FS_URL + '/';

    //params
    params.forEach(param => {
        url += (param + '/');
    });

    //query
    const query_keys = Object.keys(query);
    if (query_keys.length > 0) {
        const query_str = query_keys.map(key => {
            return `${key}=${query[key]}`;
        }).join('&');
        url += `?${query_str}`;
    }

    //request
    const options = {method, url: url, body, headers, json: true};


    return new Promise((resolve, reject) => {
        request(options, (err, response, body) => {
            if (err) reject(err);
            if (body.error) reject(body.error);
            resolve(body);
        });
    });
};

module.exports.fsRequest = fsRequest;