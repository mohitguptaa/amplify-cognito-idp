var https = require('https'),
    aws4  = require('aws4');

var postData = JSON.stringify({
        'email' : 'mohit.gupta.cse.mg@gmail.com'
});

var opts = {
    host: 'js732o05el.execute-api.us-east-1.amazonaws.com', 
    path: '/develop/user',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
}
 
// alternatively (as aws4 can infer the host):
//opts = {service: 'execute-api', region: 'us-east-1', path: '/develop'}
 
// alternatively (as us-east-1 is default):
//opts = {service: 'sqs', path: '/?Action=ListQueues'}
 
aws4.sign(opts, {accessKeyId: 'AKIA55IM3KYV6LPD7Y3P', secretAccessKey: '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'}) // assumes AWS credentials are available in process.env

var req = https.request(opts, function(res) { res.pipe(process.stdout) });
req.write(postData);
req.end();