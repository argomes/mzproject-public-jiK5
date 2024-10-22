// config/web-push.js
const { readFileSync, existsSync, writeFileSync } = require('fs');
const { join } = require('path');
const webpush = require('web-push')


const pathToVapidKey = join(__dirname, 'vapidKeys.json'); 

if (!existsSync(pathToVapidKey)) {
  const keys = webpush.generateVAPIDKeys();
  writeFileSync(pathToVapidKey, JSON.stringify(keys));
}

webpush.setGCMAPIKey('BAIQFG0WeJqo2KxheF181xbMm1-UY56d34AFZ60Q8Mau8zIdR9IsT4I9LT__mYtnrjmSgDdUPn6BvW79FquU9TU');

const vapidKeys = JSON.parse(readFileSync(pathToVapidKey).toString());

webpush.setVapidDetails(
  'mailto:notificacao@mztv.com.br',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
const public_key = vapidKeys.publicKey
module.exports = {
  webpush,
  public_key
}