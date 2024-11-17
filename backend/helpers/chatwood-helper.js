const axios = require("axios");

async function helloWorld(id) {
  return axios.get(`https://api.aaruush.org/api/v1/events/events/${id}`);
}

module.exports = {
  helloWorld,
};
