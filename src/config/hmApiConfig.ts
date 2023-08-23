import dotenv from "dotenv";

dotenv.config();

export const hmApiConfig = {
  headers: {
    "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.RAPID_KEY,
  },
};
