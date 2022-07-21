import axios from "axios";

export default axios.create({
  baseURL: "https://api.coingecko.com/api/v3", // set up the URL for endpoint
});
