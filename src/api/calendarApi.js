import axios from "axios";
import { getEnvVAriables } from "../helpers/getEnvVAriables";

const { VITE_API_URL } = getEnvVAriables();

const calendarApi = axios.create({

    baseURL: VITE_API_URL,
})

export default calendarApi;