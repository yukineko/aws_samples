var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({region: 'ap-northeast-1'});

var params = {Limit :100};
dynamodb.listTables(params, function(err, data){
    console.log(data);
    console.log(err);
});
