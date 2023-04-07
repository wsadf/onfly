import axios from "axios";

const api = axios.create({
    baseURL: "https://gorest.co.in/public/v1/",
    headers: {
        Authorization: 'Bearer af3ea61e3eaaa5b17dec851abea2a1ea33d37b6220376c63910d100425ba3c55'
      }
})

export default api;