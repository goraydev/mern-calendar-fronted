import { Provider } from "react-redux";
import { AppRouter } from "./router";
import { store } from "./store";

function CalendarApp() {
  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  );
}

export default CalendarApp;
