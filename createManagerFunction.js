var AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();


exports.handler = function(event, context, callback) {
    var body = event['body-json'];
    
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
    });
    
    
    
    const payload = {
        TableName: 'Manager',
        Item:{
            'id': body['id'],
            'name': body['name'],
            'password': body['password']
        }
    };


    dynamo.put(payload, done);
    
   
};