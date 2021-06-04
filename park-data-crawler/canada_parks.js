const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const util = require('./util');
const Park = require('./park');
const { url_base, url_base_uploads } = require('./util')

const url = `${url_base}/List_of_National_Parks_of_Canada`;

request(url, (err, res, body) => {
  const $ = cheerio.load(body);

  const items = $('.mw-parser-output table.plainrowheaders');
  const rows = items.children().toArray()[0].children;

  const parks = [];

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
    const { url_tag, filename } = util.getFileInfo(imageEl.children[0].children[0].attribs.src);
    const downloaded = util.downloadImage(`${url_base_uploads}${url_tag}${filename}`, filename);
    const location = locationEl.children[1].children[0].data + ', Canada';
    const lonLatEl = util.getSmallTag(locationEl.children, 1).children[1].children[0].children[2].children[0].children[0].children[0];
    const { lat, lon } = util.getLatLon(lonLatEl.data);
    let parkArea = 0.0;
    try {
      parkArea = util.parseArea(areaEl.children[0].children[0].data);
    } catch (_) {
      parkArea = util.parseArea(areaEl.children[0].data);
    }
    parkArea = util.kmToAcres(parkArea);
    const description = util.parseHtmlParagraph(descriptionEl.children);

    const newPark = new Park(name, filename, description, lat, lon, parkArea, '', location);
    parks.push(newPark);

    console.log(newPark, '\n')

    util.sendMultipartFormData(newPark);
  }
  fs.writeFileSync('./data.json', JSON.stringify({ parks: parks }));
});