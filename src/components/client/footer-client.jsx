import { Footer } from "antd/es/layout/layout";

const FooterClient = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#201f1d",
        color: "#676767",
      }}
    >
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
};
export default FooterClient;
