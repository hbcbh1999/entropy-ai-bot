'use strict';

var http = require('http'),
  _ = require('lodash'),
  https = require('follow-redirects').https,
  ProxyForwarder,
  instance; //making sure there is only once instance of Entropy Talker
const querystring = require('querystring');
// ## Module Methods

var is_http = (process.env.USE_HTTPS_ENTROPY_WIRE == 'no');
function stringifyWrapper(is_http,data){
  if (is_http){
    return querystring.stringify(data);
  }else{
    return JSON.stringify(data);
  }
}

ProxyForwarder = function() {
  if (!instance) {
    instance = this;

    _.extend(instance, {
      options: {
        host: process.env.ENTROPY_HOSTNAME,
        //if production, tunnel requests through a local proxy
  //if dev, requet directly
        port: (is_http ? process.env.ENTROPY_PORT : 443)
      }
    });
  }
  return instance;
};

ProxyForwarder.prototype.forwardData = function(post_data,sessionId,cb){
    post_data = stringifyWrapper(is_http,{
        'from': post_data.from,
        'sessionId': sessionId,
        'wire_transmission': JSON.stringify(post_data)
      });
    // console.log(`forwarding Data: ${post_data}`);

    // An object of options to indicate where to post to
    var post_options = {
        path: (is_http ? process.env.ENTROPY_PATH : '/entropy-ai' + process.env.ENTROPY_PATH),
        method: 'POST',
        headers: {
            'Content-Type': (is_http ? 'application/x-www-form-urlencoded' : 'application/json'),
            'Content-Length': Buffer.byteLength(post_data)
        }
    };
    console.log('request to entropy:' + post_options.path);
    post_options = _.assign(this.options,post_options);
    var client = (is_http ? http : https);
    var req = client.request(post_options, function(res) {
      if (('' + req.statusCode).match(/^2\d\d$/)) {
        cb(res.message);
      }

      // res.setEncoding('utf8');
      // res.on('data', function (body) {
        // console.log('Body: ' + body);
      // });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    // write data to request body
    req.write(post_data);
    req.end();
}

module.exports = ProxyForwarder;
