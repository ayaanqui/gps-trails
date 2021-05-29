class Park {
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