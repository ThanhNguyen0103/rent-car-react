import { Layout } from "antd";

import HeaderClient from "./client/header-client";
import FooterClient from "./client/footer-client";
import { Outlet } from "react-router-dom";

const LayoutClient = () => {
  return (
    <Layout>
      <HeaderClient />
      <Outlet />
      <FooterClient />
    </Layout>
  );
};
export default LayoutClient;
