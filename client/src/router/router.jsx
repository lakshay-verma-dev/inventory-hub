import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/home/Home";
import Shop from "../pages/Shop/Shop";
import About from "../components/about/About";
import SingleBook from "../pages/Shop/SingleBook";
import DasboardLayout from "../pages/Dasboard/DasboardLayout";
import Dasboard from "../pages/Dasboard/dashboard/Dasboard";
import UploadBook from "../pages/Dasboard/upload/UploadBook";
import ManageBook from "../pages/Dasboard/manage/ManageBook";
import EditBook from "../pages/Dasboard/edit/EditBook";
import SignUp from "../components/signup/SignUp";
import Login from "../components/login/Login";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Logout from "../components/logout/Logout";
import Cart from "../components/cart/Cart";
import Recommendations from "../pages/recommendations/Recommendations";
import ArticleDetailDrVikas from "../pages/recommendations/ArticleDetailDrVikas";
import ArticleDetail4BestSelfhelp from "../pages/recommendations/ArticleDetail4BestSelfhelp";
import ArticleDetail5Unpopular from "../pages/recommendations/ArticleDetail5Unpopular";
import ArticleDetail3Mustreadselfhelp from "../pages/recommendations/ArticleDetail3Mustreadselfhelp";
import ArticleDetail5bookscontent from "../pages/recommendations/ArticleDetail5bookscontent";
import ArticleDetail5HindiNovels from "../pages/recommendations/ArticleDetail5HindiNovels";
import ForgotPassword from "../components/login/ForgotPassword";
import Success from "../components/Success";
import Cancel from "../components/Cancel";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import UpgradeToPro from "../pages/Dasboard/upgradeToPro/UpgradeToPro";
import Documentation from "../pages/Dasboard/documentation/Documentation";

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

    element: (
      <PrivateRoute>
        <DasboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <Dasboard />,
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
      {
        path: "admin/upgrade",
        element: <UpgradeToPro />,
      },
      {
        path: "admin/documentation",
        element: <Documentation />,
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
    element: <ForgotPassword />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
