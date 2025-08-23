import React from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Col,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
  theme,
} from "antd";
import hinh5 from "../../assets/hinh5.png";
import hinh2 from "../../assets/hinh2.png";
import hinh3 from "../../assets/hinh3.png";
import hinh6 from "../../assets/hinh6.jpg";
import {
  AppstoreOutlined,
  CarOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import reactLogo from "../../assets/react.svg";
import { Link } from "react-router-dom";
import Meta from "antd/es/card/Meta";
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

  const contentStyle = {
    height: "500px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    // background: "#364d79",
  };
  const imgStyle = {
    width: "100%",
    height: "200px", // chiều cao cố định khung
    objectFit: "cover", // cắt ảnh cho vừa khung mà không méo
    borderRadius: "10px", // bo góc cho đẹp
    transition: "transform 0.4s ease-in-out",
  };

  const featuredCars = [
    {
      id: 1,
      name: "Toyota Vios",
      price: "500.000đ / ngày",
      image: hinh6,
    },
    {
      id: 2,
      name: "Honda Civic",
      price: "700.000đ / ngày",
      image: hinh6,
    },
    {
      id: 3,
      name: "Ford Everest",
      price: "900.000đ / ngày",
      image: hinh6,
    },
    {
      id: 1,
      name: "Toyota Vios",
      price: "500.000đ / ngày",
      image: hinh6,
    },
    {
      id: 2,
      name: "Honda Civic",
      price: "700.000đ / ngày",
      image: hinh6,
    },
    {
      id: 3,
      name: "Ford Everest",
      price: "900.000đ / ngày",
      image: hinh6,
    },
  ];

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
          defaultSelectedKeys={["home"]}
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
      <Content>
        <div
          style={{
            background: colorBgContainer,
            minHeight: "100vh",
            borderRadius: borderRadiusLG,
            marginTop: 56,
          }}
        >
          <Carousel autoplay>
            <div>
              <h3 style={contentStyle}>
                <img style={imgStyle} src={hinh2} alt="" />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img style={imgStyle} src={hinh3} alt="" />
              </h3>
            </div>
            <div>
              <h3 style={contentStyle}>
                <img style={imgStyle} src={hinh5} alt="" />
              </h3>
            </div>
          </Carousel>
        </div>
        <section
          className="cars"
          style={{
            padding: "50px 20px",
            background: "#f9f9f9",
            margin: "0 100px",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: 30 }}>
            🚗 Danh sách xe nổi bật
          </h2>
          <Row gutter={[24, 24]}>
            {featuredCars.map((car) => (
              <Col xs={24} sm={12} md={8} key={car.id}>
                <Card
                  // style={{ width: 300 }}
                  cover={
                    <Carousel autoplay style={{ overflow: "hidden" }}>
                      <div
                        style={{
                          ...contentStyle,
                          borderRadius: 10,
                        }}
                      >
                        <img
                          style={imgStyle}
                          src={hinh6}
                          alt=""
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.1)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        />
                      </div>
                      <div
                        style={{
                          ...contentStyle,
                          borderRadius: 10,
                        }}
                      >
                        <img style={imgStyle} src={hinh5} alt="" />
                      </div>
                    </Carousel>
                  }
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Meta
                      title="Toyota Camry SE 350"
                      description={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <StarOutlined
                              key={index}
                              style={{ fontSize: 18, marginRight: 4 }}
                            />
                          ))}
                          <span>(4.0) 138 Reviews</span>
                        </div>
                      }
                    />
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "#1890ff",
                      }}
                    >
                      45$ / Day
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default HomePage;
