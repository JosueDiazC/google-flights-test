export const API = "https://sky-scrapper.p.rapidapi.com/api/v1/flights";
export const API_HOST = import.meta.env.VITE_API_HOST as string;
export const API_KEY = import.meta.env.VITE_API_KEY as string;

export const HEADERS = {
  "x-rapidapi-host": API_HOST,
  "x-rapidapi-key": API_KEY,
};

export const MULTI_AIRLINES_LOGO_URL =
  "https://www.gstatic.com/flights/airline_logos/70px/dark/multi.png";
