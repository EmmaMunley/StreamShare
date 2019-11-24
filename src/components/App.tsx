import React from "react";
import { Provider } from "react-redux";
import { HomePage } from "./Homepage";
import { store } from "../store";

const App: React.FC = () => (
        <Provider store={store}>
                <HomePage />
        </Provider>
);

export default App;
