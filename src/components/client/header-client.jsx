import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";

import {
  AppstoreOutlined,
  CarOutlined,
  HistoryOutlined,
  HomeOutlined,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import reactLogo from "../../assets/logo.svg";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../auth";
import "../../style/header.css";
import { Children } from "react";

const { Header } = Layout;

const HeaderClient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleLogout } = useUserContext();

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "/",
      icon: <HomeOutlined />,
      className: "customclass",
    },
    {
      label: <Link to={"/cars"}>Cars</Link>,
      key: "cars",
      icon: <CarOutlined />,
      className: "customclass",
    },
    {
      label: "Pages",
      key: "history",
      className: "customclass",
      icon: <AppstoreOutlined />,
    },
    {
      label: "Contact",
      key: "Contact",
      icon: <PhoneOutlined />,
      className: "customclass",
    },
  ];
  let selectedKey = items[0].key; // default

  for (let item of items) {
    if (matchPath({ path: item.key + "/*" }, location.pathname)) {
      selectedKey = item.key;
      break;
    }
  }

  const itemsDropdown = [
    {
      label: <Link to={"/"}>Trang chủ</Link>,
      key: "home",
    },

    user?.role?.name == "ADMIN"
      ? {
          label: <Link to={"/admin"}>Quản lí tài khoản</Link>,
          key: "admin",
        }
      : {
          label: <Link to={"/history"}>Quản lí đơn hàng</Link>,
          key: "history",
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
    <>
      <Header
        style={{
          // padding: "0 24px 0 50px",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          boxShadow:
            "0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)",
        }}
      >
        <div>
          <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
            <img
              src={reactLogo}
              alt="logo"
              style={{
                height: 40,
                marginRight: 16,
                animation: "spin 10s linear infinite",
              }}
            />
          </Link>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={selectedKey}
          style={{
            flex: 1,
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 16,
          }}
          items={items}
        />
        <div style={{ display: "flex", marginRight: 8 }}>
          <Space>
            {user ? (
              <div>
                <Dropdown
                  menu={{ items: itemsDropdown }}
                  trigger={["click"]}
                  placement="bottomRight"
                  arrow={{ pointAtRight: true }}
                >
                  <span style={{ cursor: "pointer" }}>
                    {user?.fullName} <Avatar size={32}>{user.role.name}</Avatar>
                  </span>
                </Dropdown>
              </div>
            ) : (
              <div>
                <Space>
                  <Button
                    className="custom-btn-login"
                    size="large"
                    onClick={() => navigate("/login")}
                  >
                    <UserOutlined /> Sign In
                  </Button>

                  <Button
                    className="custom-btn-register"
                    type="primary"
                    size="large"
                    onClick={() => navigate("/register")}
                  >
                    <LockOutlined /> Sign Up
                  </Button>
                </Space>
              </div>
            )}
          </Space>
        </div>
      </Header>
    </>
  );
};

export default HeaderClient;
