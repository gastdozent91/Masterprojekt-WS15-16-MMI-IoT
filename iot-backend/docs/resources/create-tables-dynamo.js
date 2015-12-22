/*
    Create table "sensor"
*/
var params = {
    TableName: 'sensor',
    KeySchema: [
        {
            AttributeName: 'id',
            KeyType: 'HASH',
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'id',
            AttributeType: 'S',
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) print(err);
    else print(data);
});

/*
    Create table "gateway"
*/


/*
    Create table "user"
*/