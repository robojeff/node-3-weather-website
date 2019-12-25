const request = require('request');

const geocode = (address, callback) => {
  const access_token =
    'pk.eyJ1Ijoicm9ib2plZmYiLCJhIjoiY2s0ZWFyNnhlMDU5MTNlcnY3Z3V1c29vMSJ9.Rx0ybUh_KKZF8d3_GGLb0w';
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${access_token}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the Geo-Location service!');
    } else if (body.features.length === 0) {
      callback('Unable to get coordinates from the Geo-Location service!');
    } else {
      const longitude = body.features[0].center[0];
      const latitude = body.features[0].center[1];
      const location = body.features[0].place_name;

      callback(undefined, { longitude, latitude, location });
    }
  });
};

module.exports = geocode;
