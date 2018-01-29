module.exports.receive = (event, context, callback) => {
  console.log('Receive form stream:', JSON.stringify(event))
  callback(null, event)
}
