class Park {
  /**
   *
   * @param {string} name
   * @param {string} image
   * @param {string} description
   * @param {number} lat
   * @param {number} lon
   * @param {number} parkArea
   * @param {string} contact
   * @param {string} location
   */
  constructor(name, image, description, lat, lon, parkArea, contact, location) {
    this.name = name;
    this.image = image;
    this.description = description;
    this.lat = lat;
    this.lon = lon;
    this.parkArea = parkArea;
    this.contact = contact;
    this.location = location;
  }
};

module.exports = Park;