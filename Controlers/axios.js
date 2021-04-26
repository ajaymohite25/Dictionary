const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://od-api.oxforddictionaries.com/api/v2/entries/en-gb",
  headers: {
    app_id: process.env.API_ID,
    app_key: process.env.API_KEY,
  },
});

exports.axiosInstance = axiosInstance;
