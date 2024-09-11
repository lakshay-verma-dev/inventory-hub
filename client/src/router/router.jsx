import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../Home/home/Home";
import Shop from "../Shop/Shop";
import About from "../components/about/About";
import SingleBook from "../Shop/SingleBook";
import DasboardLayout from "../Dasboard/DasboardLayout";
import Dasboard from "../Dasboard/dashboard/Dasboard";
import UploadBook from "../Dasboard/upload/UploadBook";
import ManageBook from "../Dasboard/manage/ManageBook";
import EditBook from "../Dasboard/edit/EditBook";
import SignUp from "../components/signup/SignUp";
import Login from "../components/login/Login";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Logout from "../components/logout/Logout";
import Cart from "../components/cart/Cart";
import Recommendations from "../recommendations/Recommendations";
import ArticleDetailDrVikas from "../recommendations/ArticleDetailDrVikas";
import ArticleDetail4BestSelfhelp from "../recommendations/ArticleDetail4BestSelfhelp";
import ArticleDetail5Unpopular from "../recommendations/ArticleDetail5Unpopular"
import ArticleDetail3Mustreadselfhelp from "../recommendations/ArticleDetail3Mustreadselfhelp";
import ArticleDetail5bookscontent from "../recommendations/ArticleDetail5bookscontent";
import ArticleDetail5HindiNovels from "../recommendations/ArticleDetail5HindiNovels"
import ForgotPassword from "../components/login/ForgotPassword";
import Success from "../components/Success";
import Cancel from "../components/Cancel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/recommedation",
        element: <Recommendations />,
      },
      {
        path: "/articledetail/drvikas",
        element: <ArticleDetailDrVikas />,
      },
      {
        path: "/articledetail/selfhelp",
        element: <ArticleDetail4BestSelfhelp />,
      },
      {
        path: "/articledetail/fiction",
        element: <ArticleDetail5Unpopular />,
      },
      {
        path: "/articledetail/4best",
        element: <ArticleDetail3Mustreadselfhelp />,
      },
      {
        path: "/articledetail/contentcreators",
        element: <ArticleDetail5bookscontent />,
      },
      {
        path: "/articledetail/hindi",
        element: <ArticleDetail5HindiNovels />,
      },

      {
        path: "/book/:id",
        element: <SingleBook />,
      },
    ],
  },
  {
    path: "/admin",
    element: <DasboardLayout />,
    children: [
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            <Dasboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/upload",
        element: <UploadBook />,
      },
      {
        path: "/admin/manage",
        element: <ManageBook />,
      },
      {
        path: "/admin/manage/edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "admin/logout",
        element: <Logout />,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
   {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot",
    element:<ForgotPassword/>
  },
  {
    path: "/success",
    element:<Success/>
  },
  {
    path: "/cancel",
    element:<Cancel/>
  }
]);

export default router;
