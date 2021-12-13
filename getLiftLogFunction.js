var AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();


exports.handler = function(event, context, callback) {
    
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
    });
    
    const payload = {
        TableName: 'LiftLogging',
        ScanIndexForward: false,
        KeyConditionExpression: "deviceId = :id",
        ExpressionAttributeValues: {
            ":id": event.id
        }
    };


    dynamo.query(payload, done);
    
};