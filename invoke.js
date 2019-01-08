const BUILD_ID = '2f2c31fb';
const FUNCTION = 'addition'
const fn = 'addition_9fcfc4c0';

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const lambda = new AWS.Lambda();

const params = {
  InvocationType: 'RequestResponse',
  FunctionName: fn//`${FUNCTION}_${BUILD_ID}`
};
// if (arg !== undefined && arg !== null) {
//   params.Payload = Buffer.from(JSON.stringify(arg))
// } else if (arg === null) {
//   params.Payload = null;
// }

// return new Promise(function (resolve, reject) {
//   lambda.invoke(params, function (err, res) {
//     if(err) reject(err);
//     else resolve(res);
//   });
// });

lambda.invoke(params, function (err, res) {
    if(err) {
      console.log('crap broke');
      console.log(err);
    } else {
      console.log('Successful lambda invocation');
      console.log(res.StatusCode);
      console.log('payload:');
      console.log(JSON.parse(res.Payload));
    }
  });

