import React from "react";
import { Avatar, Breadcrumb, Dropdown, Layout, Menu, Space, theme } from "antd";
import {
  AppstoreOutlined,
  CarOutlined,
  DownOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import reactLogo from "../../assets/react.svg";
import { Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;

const HomePage = () => {
  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "Cars",
      key: "Cars",
      icon: <CarOutlined />,
    },
    {
      label: "Pages",
      key: "Pages",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Contact",
      key: "Contact",
      icon: <PhoneOutlined />,
    },
  ];
  const itemsDropdown = [
    {
      label: <Link to={"/"}>Trang chủ</Link>,
      key: "home",
    },
    {
      label: <Link to={"/admin"}>Quản lí tài khoản</Link>,
      key: "admin",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => {}}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={reactLogo}
            alt="logo"
            style={{
              height: 40,
              marginRight: 16,
              animation: "spin 10s linear infinite",
            }}
          />
          <span style={{ color: "black", fontSize: 20 }}>Rental Car</span>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ flex: 1, justifyContent: "center" }}
          items={items}
        />
        <div style={{ display: "flex" }}>
          <Space>
            <span style={{ display: "flex", alignItems: "center" }}>
              <ShoppingCartOutlined style={{ fontSize: 32 }} />
            </span>

            <Dropdown
              menu={{ items: itemsDropdown }}
              trigger={["click"]}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
            >
              <span style={{ cursor: "pointer" }}>
                <Avatar size={32}>IU</Avatar>
              </span>
            </Dropdown>
          </Space>
        </div>

        {/* CSS keyframes */}
        <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
        />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default HomePage;
