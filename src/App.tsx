import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/browser";

import { Router } from "./screens/Router";
import configureStore from "./store";
import "./App.css";

const store = configureStore();

// Sentry
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://cd19416ad99349d0bc8df4b50b374d4e@sentry.io/3026714",
  });
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
