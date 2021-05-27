const request = require('request');
const page = request('https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States', (err, res, body) => {
  console.log(body);
});