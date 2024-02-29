import React from "react";
import ReactDOM from "react-dom/client";
import "@fortawesome/fontawesome-free";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CounterContextProvider } from "./CounterContext";
import { UserContextProvider } from "./UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";




const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 10 * (60 * 60),
      refetchOnWindowFocus: false,
      
    },
  },
});
root.render(
  <UserContextProvider>
    <CounterContextProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster></Toaster>
        <App />
        {/* <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom-right"
        ></ReactQueryDevtools> */}
      </QueryClientProvider>
    </CounterContextProvider>
  </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
