var awsIot = require('aws-iot-device-sdk');

// 秘密鍵、証明書などの設定
var device = awsIot.device({
  region: 'ap-northeast-1',
  clientId: 'MyNewThing-client',
  privateKey: '../certs/private.pem.key',
  clientCert: '../certs/certificate.pem.crt',
  caCert: '../certs/root-CA.crt',
});

var count = 0;

// 通信確立した際に呼び出されるイベント
device.on('connect', function() {
  console.log('connect');
  device.subscribe('log');
  setInterval( function() {
    count++;
    var led = count % 2;
    console.log(led.toString());
    device.publish('topic/test', led.toString());
  }, 1000);
});

device.on('message', function(log, payload){
    console.log('message', log, payload.toString());
});

