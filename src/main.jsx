import React from "react";
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App"
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <ShowCreators /> },
        { path: ":name", element: <ViewCreator /> },
        { path: ":name/edit", element: <EditCreator /> },
        { path: "new", element: <AddCreator /> },
      ],
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
        <RouterProvider router={router} />
)