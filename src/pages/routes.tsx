import App, * as homepage from "./App";
import { createBrowserRouter } from "react-router-dom";
import AuthenticationPage, * as authentication from "./AuthenticationPage";
import ErrorBoundary from "./ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <App />, loader: homepage.loader },
      {
        path: "/login",
        element: <AuthenticationPage />,
        loader: authentication.loader,
      },
    ],
  },
]);
