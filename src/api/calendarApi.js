import axios from "axios";
import { config } from "localforage";
import { getEnvVAriables } from "../helpers/getEnvVAriables";

const { VITE_API_URL } = getEnvVAriables();

const calendarApi = axios.create({

    baseURL: VITE_API_URL,
})


//TODO: configurar interceptores
/*  nos servirá para validar nuestro token 
    ante cualquier request por parte del usuario
 */
calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem("token"),
    }

    return config;
})

export default calendarApi;