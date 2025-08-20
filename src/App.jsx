import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutAdmin } from "./components/layout.admin";
import Dashboard from "./pages/admin/Dashboard";
import "./style/global.css";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { UserPage } from "./pages/admin/user";
import CarTabs from "./pages/admin/car/car-tabs";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
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
        path: "/admin/car",
        element: (
          <ConfigProvider locale={viVN}>
            <CarTabs />
          </ConfigProvider>
        ),
      },
      {
        path: "/admin/user",
        element: (
          <ConfigProvider locale={viVN}>
            <UserPage />
          </ConfigProvider>
        ),
      },
      {
        path: "/admin/rental",
        element: (
          <ConfigProvider locale={viVN}>
            <div>renteal</div>
          </ConfigProvider>
        ),
      },
    ],
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
