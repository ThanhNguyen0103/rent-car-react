import { Layout } from "antd";

import HeaderClient from "./client/header-client";
import FooterClient from "./client/footer-client";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const LayoutClient = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <Layout>
      <HeaderClient />
      <Outlet />
      <FooterClient />
    </Layout>
  );
};
export default LayoutClient;
