import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BounceLoader, ClipLoader } from "react-spinners";
import { Provider } from "react-redux";
import store from "./store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Suspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center bg-white">
            <ClipLoader color="#00A0AE" loading size={75} />
          </div>
        }
      >
        <App />
      </Suspense>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
