import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { app } from "./config/firebaseConfig.js";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { FirebaseProvider } from "./context/firebaseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </FirebaseProvider>
  </React.StrictMode>
);
