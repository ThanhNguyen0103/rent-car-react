import {
  AppstoreOutlined,
  BugOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ScheduleOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Layout, Menu, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export const LayoutAdmin = () => {
  const location = useLocation();
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
      label: <Link to="/admin/product">Product</Link>,
      key: "/admin/product",
      icon: <ScheduleOutlined />,
    },
    {
      label: <Link to="/admin/user">User</Link>,
      key: "/admin/user",
      icon: <UserOutlined />,
    },
  ];
  const itemsDropdown = [
    {
      label: <Link to={"/"}>Trang chủ</Link>,
      key: "home",
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
                Welcome
                <Avatar> IU</Avatar>
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
