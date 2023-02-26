import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import {
    clearErrorMessage,
    onChecking,
    onLogin,
    onLogout
} from "../store/auth/authSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {

            const { data } = await calendarApi.post("/auth", { email, password });
            localStorage.setItem("token", data.token);
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout("Incorrect fields"));
            console.error(error);

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startNewRegister = async ({ email, password, name }) => {
        try {

            const { data } = await calendarApi.post("/auth/new", { email, password, name });
            localStorage.setItem("token", data.token);
            dispatch(onLogin({ name: data.name, password: data.password, email: data.email }));


        } catch (error) {
            console.error(error);
            dispatch(onLogout(erro.response.data?.msg || ""));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get("/auth/renew");
            localStorage.setItem("token", data.token);
            dispatch(onLogin({ name: data.name, uid: data.uid }));


        } catch (error) {
            console.error(error);
            localStorage.removeItem("token");
            dispatch(onLogout());
        }


    }


    return {
        //Propierties
        errorMessage,
        status,
        user,

        //Methods
        startLogin,
        startNewRegister,
        checkAuthToken
    }
}