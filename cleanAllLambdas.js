const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const lambda = new AWS.Lambda();

lambda.listFunctions({}, function (err, res) {
    if(err) {
      console.log('crap broke');
      console.log(err);
    } else {
      (res.Functions || [])
        .forEach(fn => {
          lambda.deleteFunction({FunctionName: fn.FunctionName}, (e, r) => {
            if (e) console.log(e);
            else console.log(r);
          })
        });
    }
  });

