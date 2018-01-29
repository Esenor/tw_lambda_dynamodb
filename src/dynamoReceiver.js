const AWS = require('aws-sdk')

// Set default region
AWS.config.update({
  region: 'eu-west-3'
})

module.exports.receive = (event, context, callback) => {
  console.log('Receive form stream:', JSON.stringify(event))

  let s3 = new AWS.S3()
  s3.putObject({
    Bucket: `${process.env.TW_BUCKET_NAME}`,
    Key: `${Date.now()}.json`,
    Body: JSON.stringify(event)
  }, (err, data) => {
    //
    if (err) {
      // Error handler
      console.log(err)
      callback(null, {
        error: err
      })
    } else {
      console.log('File put in S3')
      callback(null, {
        msg: 'File put in S3'
      })
    }
  })
}
