const fs = require('fs');
const imageDowloader = require('image-downloader');

exports.downloadImage = (uri, filename) => {
  if (fs.existsSync(`./images/${filename}`))
    return false;

  imageDowloader.image({
    url: uri,
    dest: `./images/${filename}`
  })
    .then(null)
    .catch(err => console.error(err));
  return true;
};

exports.getSmallTag = (child, start) => {
  for (let i = start; i < child.length; i++) {
    const curNode = child[i];
    if (curNode.name === 'small')
      return curNode;
  }
  return null;
};

const parseDegree = str => {
  const degreeCharPos = str.indexOf('°');
  return parseFloat(str.substring(0, degreeCharPos));
};

/**
 * 
 * @param {string} str of the form `59.92°N 149.65°W`
 * @returns `{lat: number, lon: number}`
 */
exports.getLatLon = str => {
  const latLonArr = str.split(' ');
  const lat = parseDegree(latLonArr[0]);
  const lon = parseDegree(latLonArr[1]);
  return { lat, lon };
};

/**
 * 
 * @param {string} areaAcresStr of the form `49,076.63 acres`
 * @returns float in acres
 */
exports.parseAreaAcres = areaAcresStr => {
  return parseFloat(areaAcresStr.split(' ')[0].replace(',', ''));
};

/**
 * 
 * @param {Node[]} paragraph 
 */
exports.parseHtmlParagraph = paragraph => {
  return paragraph
    .filter(node => node.name !== 'sup')
    .map(node => {
      if (node.name == 'a') {
        return node.children[0].data;
      }
      return node.data === '\n' ? ' ' : node.data;
    })
    .join('');
};

/**
 * 
 * @param {string} url 
 * @returns 
 */
exports.getFileInfo = url => {
  const url_base = '//upload.wikimedia.org/wikipedia/commons/';
  const url_front = `${url_base}thumb/`;
  const tag = 'x/xx/';

  const url_tag = url.substr(url_front.length, tag.length);

  const filename = url
    .substring(url_front.length + tag.length)
    .split('/')[0];

  return { url_tag, filename };
};