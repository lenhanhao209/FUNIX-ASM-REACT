import React from "react";
import Main from "./Components/Main";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./Redux/ConfigureStore";

const store = configureStore();

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
