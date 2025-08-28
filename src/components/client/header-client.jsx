import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";

import {
  AppstoreOutlined,
  CarOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import reactLogo from "../../assets/react.svg";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../auth";

const { Header } = Layout;

const HeaderClient = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  console.log(user);
  const location = useLocation();

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: "/",
      icon: <HomeOutlined />,
    },
    {
      label: "Cars",
      key: "/car",
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
  return (
    <>
      <Header
        style={{
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
          selectedKeys={selectedKey}
          style={{ flex: 1, justifyContent: "center" }}
          items={items}
        />
        <div style={{ display: "flex" }}>
          <Space>
            {user ? (
              <Dropdown
                menu={{ items: itemsDropdown }}
                trigger={["click"]}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
              >
                <span style={{ cursor: "pointer" }}>
                  <Avatar size={32}>{user.role.name}</Avatar>
                </span>
              </Dropdown>
            ) : (
              <Button
                type="primary"
                shape="round"
                size="middle"
                style={{
                  background: "#1890ff",
                  borderColor: "#1890ff",
                  fontWeight: 500,
                  padding: "0 20px",
                }}
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </Button>
            )}
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
    </>
  );
};
export default HeaderClient;
