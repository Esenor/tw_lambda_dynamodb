const AWS = require('aws-sdk')
const uuidv1 = require('uuid/v1')

AWS.config.update({
  region: 'eu-west-3'
})

module.exports.write = (event, context, callback) => {
  let docClient = new AWS.DynamoDB.DocumentClient()

  let customer = Object.assign({
    name: 'default first name',
    lastName: 'default last name',
    mail: 'default@email.com'
  }, event, {
    customer_id: uuidv1()
  })

  let params = {
    TableName: 'dev--ddieu--tw--customer',
    Item: {
      customer_id: customer.customer_id,
      name: customer.name,
      lastName: customer.lastName,
      mail: customer.mail
    }
  }

  docClient.put(params, function (err, data) {
    if (err) {
      console.error('Unable to add the customer', JSON.stringify(err, null, 2))
    } else {
      console.log('Customer PutItem succeeded')
    }
  })

  callback(null, {msg: 'Customer added', customer: customer})
}
