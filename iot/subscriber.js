var awsIot = require('aws-iot-device-sdk');
var pin = 4;

var device = awsIot.device({
  region: 'ap-northeast-1',
  clientId: 'MyNewThing',
  privateKey: '../certs/private.pem.key',
  clientCert: '../certs/certificate.pem.crt',
  caCert: '../certs/root-CA.crt',
});

// 通信確立時
device.on('connect', function() {
    console.log('connect');
    device.subscribe('topic/test');
});

// subscribeしたトピックにpublishされた時のイベント
device.on('message', function(topic, payload) {
    console.log('message', topic, payload.toString());
    device.publish('log', JSON.stringify({log_id : Math.random() * 100000000}));
});

process.stdin.resume();

// Ctrl+Cによって終了する場合の処理
process.on('SIGINT', function() {
  process.exit();
});
