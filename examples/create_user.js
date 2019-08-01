var https = require('https'),
    aws4  = require('aws4');

var postData = JSON.stringify({
        'email' : '<user-email>'
});

var opts = {
    host: '<api-gateway-host>', 
    path: '/develop/user',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
}
 
aws4.sign(opts, {accessKeyId: '<your-aws-account-access-key>', secretAccessKey: '<your-aws-account-secret>'})

var req = https.request(opts, function(res) { res.pipe(process.stdout) });
req.write(postData);
req.end();