import React from "react";
import { RouterProvider } from "react-router-dom";
import RouteConfig from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(51,65,85)",
            color: "#f7f7f7",
          },
        }}
      />
      <RouterProvider router={RouteConfig} />
    </div>
  );
}

export default App;
