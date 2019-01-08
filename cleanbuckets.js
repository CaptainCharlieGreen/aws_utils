const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const s3 = new AWS.S3();
const promisify = require('util').promisify;
const p = function (name) {
  return promisify(s3[name].bind(s3));
}

const list = p('listBuckets');
const objects = p('listObjects');
const deleteObjects = p('deleteObjects');
const deleteBucket = p('deleteBucket');

list({})
  .then(buckets => {
    const w = (buckets.Buckets || [])
      .slice(0, 20)
      .filter(b => b !== undefined)
      .map(b => b.Name);
    return Promise.all(w.map(bucket => {
      return objects({Bucket: bucket})
        .then(thing => {
          if (Array.isArray(thing.Contents) && thing.Contents.length > 0) {
            return deleteObjects({
              Bucket: bucket,
              Delete: {
                Objects: thing.Contents.map(content => {
                  return {
                    Key: content.Key
                  }
                })
              }
            })
          }
          return Promise.resolve();
        })
        .then(() => deleteBucket({Bucket: bucket}))
    }));
  })
  .catch( e => console.log(e));
