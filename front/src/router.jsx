/* React router dom */
import { createBrowserRouter } from "react-router-dom";
/* Pages */
import Layout from "./Layout";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import ErrorPage from "./pages/Error";
import Products from "./pages/Products";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage/>
  },
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/products",
        element: <Products/>
      },
    ]
  },
  {
    path: '/error',
    element: <ErrorPage/>
  }
])