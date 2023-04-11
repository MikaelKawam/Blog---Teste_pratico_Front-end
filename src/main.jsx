import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import App from "./App";
import Home from "./routes/Home";
import Comments from "./routes/Comments";
import UserDetails from "./routes/UserDetails";
import Users from "./routes/Users";
import NewPost from "./routes/NewPost";
import Admin from "./routes/Admin";
import EditPost from "./routes/EditPost";

import "./index.css";

// Executar links
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/posts/:id/comments",
        element: <Comments />,
      },
      {
        path: "/users/:id",
        element: <UserDetails />,
      },
      {
        path: "/new",
        element: <NewPost />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      ,
      {
        path: "/posts/edit/:id",
        element: <EditPost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
