const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const apiKey = '9182c0eb57011efecc5ce312c3263dc1';
  const url = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the weather service!');
    } else if (body.error) {
      callback('Unable to get a location for the forecast!');
    } else {
      const summary = body.daily.data[0].summary;
      const temperature = body.currently.temperature;
      const precipProbability = body.currently.precipProbability;

      callback(
        undefined,
        `${summary} It is currently ${temperature} degrees out.  There is a ${precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
