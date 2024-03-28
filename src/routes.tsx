import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Details } from "./pages/Details";

export const router = createBrowserRouter([
  {
    path: "/:pageId?",
    children: [{ path: ":pageId?/detail/:itemId", element: <Details /> }],
    element: <App />,
  },
]);
