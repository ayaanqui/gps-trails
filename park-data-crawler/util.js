const fs = require('fs');

exports.downloadImage = (uri, filename) => {
  if (fs.existsSync(`./images/${filename}`))
    return false;

  request.head(uri, (err, res, body) => {
    request(uri)
      .pipe(fs.createWriteStream(`./images/${filename}`));
  });
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
 * @param {string} str of the form '59.92°N 149.65°W'
 * @returns {number, number} lat, lon
 */
exports.getLatLon = str => {
  const latLonArr = str.split(' ');
  const lat = parseDegree(latLonArr[0]);
  const lon = parseDegree(latLonArr[1]);
  return { lat, lon };
};