const AWS = require('aws-sdk')
const uuidv1 = require('uuid/v1')

// Set default region
AWS.config.update({
  region: 'eu-west-3'
})

/**
 * Write handler, put a record inside DynamoDB
 * @param {object} event
 * @param {object} context
 * @param {function} callback
 */
module.exports.write = (event, context, callback) => {
  // Instantiate the DynamoDB Document client
  let dynamoDBClient = new AWS.DynamoDB.DocumentClient()

  // Define and create an Customer object with the event params
  let customer = Object.assign({
    name: 'default first name',
    lastName: 'default last name',
    mail: 'default@email.com'
  }, event, {
    customer_id: uuidv1()
  })

  // Define the DynamoDB Document to put inside DynamoDB
  let params = {
    TableName: process.env.TW_DYNAMODB_TABLENAME,
    Item: {
      customer_id: customer.customer_id,
      name: customer.name,
      lastName: customer.lastName,
      mail: customer.mail
    }
  }

  // Put customer record inside DynamoDB
  dynamoDBClient.put(params, function (err, data) {
    if (err) {
      console.error('Unable to add the customer', JSON.stringify(err, null, 2))
    } else {
      console.log('Customer PutItem succeeded')
    }
  })

  // Return customer to consumer
  callback(null, {msg: 'Customer added', customer: customer})
}
