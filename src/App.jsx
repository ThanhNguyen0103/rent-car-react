import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutAdmin } from "./components/layout.admin";
import Dashboard from "./pages/admin/Dashboard";
import "./style/global.css";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { UserPage } from "./pages/admin/user";
import CarTabs from "./pages/admin/car/car-tabs";
import RentalPage from "./pages/admin/rental";
import LoginPage from "./pages/login";
import HomePage from "./pages/client/home-page";
import CarDetailsPage from "./pages/client/car-details-page";
import LayoutClient from "./components/layout.client";
import CheckoutPage from "./pages/client/checkout-page";
import ComfirmPage from "./pages/client/comfirm-page";
import PrivateRoute from "./components/private-route";
import { UserProvider } from "./components/auth";
import ForbiddenPage from "./pages/error-page/FobidenPage";
import RentalHistoryPage from "./pages/client/history-page";
import CarListPage from "./pages/client/car-list-page";
import RegisterForm from "./pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "cars/:id",
        element: <CarDetailsPage />,
      },
      {
        path: "cars",
        element: <CarListPage />,
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "history",
        element: (
          <PrivateRoute>
            <RentalHistoryPage />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-confirmation",
        element: <ComfirmPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/forbidden",
    element: <ForbiddenPage />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute role={"ADMIN"}>
        <LayoutAdmin />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ConfigProvider locale={viVN}>
            <Dashboard />
          </ConfigProvider>
        ),
      },
      {
        path: "car",
        element: (
          <ConfigProvider locale={viVN}>
            <CarTabs />
          </ConfigProvider>
        ),
      },
      {
        path: "user",
        element: (
          <ConfigProvider locale={viVN}>
            <UserPage />
          </ConfigProvider>
        ),
      },
      {
        path: "rental",
        element: (
          <ConfigProvider locale={viVN}>
            <RentalPage />
          </ConfigProvider>
        ),
      },
    ],
  },
]);
const App = () => {
  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
};

export default App;
