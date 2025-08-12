import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LayoutAdmin } from "./components/layout.admin";
import Dashboard from "./pages/admin/Dashboard";
import "./style/global.css";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
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
        path: "/admin/product",
        element: <div>product </div>,
      },
      {
        path: "/admin/user",
        element: <div>user </div>,
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
