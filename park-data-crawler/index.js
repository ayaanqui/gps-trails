const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const url_base = 'https://en.wikipedia.org/wiki';
const url = `${url_base}/List_of_national_parks_of_the_United_States`;

const downloadImage = (uri, filename) => {
  if (fs.existsSync(`./images/${filename}`))
    return false;

  request.head(uri, (err, res, body) => {
    request(uri)
      .pipe(fs.createWriteStream(`./images/${filename}`));
  });
  return true;
};

const page = request(url, (err, res, body) => {
  const $ = cheerio.load(body);

  const items = $('.mw-parser-output table.wikitable.sortable.plainrowheaders');
  const rows = items.children().toArray()[0].children;
  for (let i = 2; i < rows.length; i += 2) {
    const tr = rows[i];

    const nameEl = tr.children[1];
    const imageEl = tr.children[3];
    const locationEl = tr.children[5];
    // const dateEstablishedEl = tr.children[7];
    const areaEl = tr.children[9];
    // const recentVisitorsEl = tr.children[11];
    const descriptionEl = tr.children[13];

    const name = nameEl.children[0].attribs.title;
    const image = imageEl.children[0].attribs.href.substring(11);
    const downloaded = downloadImage(`${url_base}/wiki/File:${image}`, image);
  }
});