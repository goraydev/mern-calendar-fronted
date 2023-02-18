import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

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


    return {
        //Propierties
        errorMessage,
        status,
        user,

        //Methods
        startLogin
    }
}