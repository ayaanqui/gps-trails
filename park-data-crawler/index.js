const url = 'https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States';
const request = require('request');
const page = request(url, (err, res, body) => {
  const cheerio = require('cheerio');
  const $ = cheerio.load(body);

  const items = $('.mw-parser-output table.wikitable').html();
  console.log(items);
});