const express = require('express');
const redis = require('redis');
const procrss = require('process');

const app = express();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379,
});
client.set('visits', 0);

app.get('/', (req, res) => {
  // procrss.exit(0);  - This is not a failure, it is a graceful exit from the app.
  // procrss.exit(100); - This is a failure case. Except 1 all other numbers are taken as failures of the app.
  client.get('visits', (err, visits) => {
    res.send('Number of visits is : ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('App started listning on port 8081');
});