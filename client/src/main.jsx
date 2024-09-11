import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import {FirebaseProvider} from "./provider/AuthProvider.jsx";
// import Auth from "./provider/Auth.jsx";
// import AuthProvider from "./contacts/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <FirebaseProvider>
        <RouterProvider router={router} />
      </FirebaseProvider>
    </Provider>
  </StrictMode>
);
