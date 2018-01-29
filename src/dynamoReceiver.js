module.exports.receive = (event, context, callback) => {
  console.log('Receive form stream:', event)
  callback(null, event)
}
