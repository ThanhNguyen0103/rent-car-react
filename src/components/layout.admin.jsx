import {
  AppstoreOutlined,
  BugOutlined,
  CarOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Layout, Menu, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "./auth";

export const LayoutAdmin = () => {
  const location = useLocation();
  const { user, handleLogout } = useUserContext();
  const [current, setCurrent] = useState(location.pathname);
  const [collapsed, setCollapsed] = useState(false);

  const onClick = (e) => {
    setCurrent(e.key);
  };
  const itemsMenu = [
    {
      label: <Link to="/admin">Dashboard</Link>,
      key: "/admin",
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to="/admin/car">Car</Link>,
      key: "/admin/car",
      icon: <CarOutlined />,
    },
    {
      label: <Link to="/admin/user">User</Link>,
      key: "/admin/user",
      icon: <UserOutlined />,
    },
    {
      label: <Link to="/admin/rental">Rental</Link>,
      key: "/admin/rental",
      icon: <FileTextOutlined />,
    },
  ];
  const itemsDropdown = [
    {
      label: <Link to={"/"}>Trang chủ</Link>,
      key: "home",
    },
    {
      label: (
        <Link
          to={"/login"}
          style={{ cursor: "pointer" }}
          onClick={() => {
            handleLogout();
          }}
        >
          Đăng xuất
        </Link>
      ),
      key: "logout",
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div style={{ height: 32, margin: 16, textAlign: "center" }}>
          <BugOutlined /> ADMIN
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          selectedKeys={[current]}
          onClick={onClick}
          theme="light"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={itemsMenu}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#f5f5f5" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
              <Space style={{ cursor: "pointer", marginRight: 20 }}>
                <span> Xin chào ! {user.fullName}</span>
                <Avatar> {user.role.name}</Avatar>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              //   background: "#ffffff",
              borderRadius: 5,
              height: "100%",
            }}
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};
