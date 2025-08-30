import React, { useEffect, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Checkbox,
  Layout,
  List,
  Menu,
  message,
  theme,
} from "antd";
import { callGetCar } from "../../service/service-api";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
const { Content, Sider } = Layout;

const CarListPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 1,
    total: 0,
  });
  const [filters, setFilters] = useState({
    brands: [],
    Models: [],
    priceRange: null,
  });

  const [car, setCar] = useState();

  useEffect(() => {
    handleGetCar();
  }, []);

  const handleGetCar = async (page, size, queryExtra) => {
    setLoading(true);

    try {
      let query = {
        page,
        size,
        ...queryExtra,
      };
      const res = await callGetCar(query);
      if (res.data && res.data.result) {
        setCar(res.data.result);
        setPagination({
          current: res.data.meta.currentPage,
          pageSize: res.data.meta.pageSize,
          total: res.data.meta.total,
        });
      }
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleFilterChange = (change) => {
    setFilters((prev) => ({ ...prev, ...change }));
  };

  const handleSubmitFilter = async () => {
    const query = {
      brand: filters.brands,
      carModel: filters.Models,
      page: pagination.current,
      size: pagination.pageSize,
      price: filters.priceRange,
    };

    await handleGetCar(query.page, query.size, query);
  };

  return (
    <Layout>
      <div style={{ padding: "0 48px", margin: "64px 0" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
        />
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
              borderRight: "1px solid rgba(5,5,5,0.06)",
            }}
            width={200}
          >
            <h3 style={{ marginBottom: 16 }}>Bộ lọc</h3>

            {/* Hãng xe */}
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontWeight: 500 }}>Hãng xe</span>
              <Checkbox.Group
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 8,
                }}
                onChange={(values) => handleFilterChange({ brands: values })}
              >
                <Checkbox value="toyota">Toyota</Checkbox>
                <Checkbox value="Chevrolet">Chevrolet</Checkbox>
                <Checkbox value="Ford">Ford</Checkbox>
              </Checkbox.Group>
            </div>

            {/* Dòng xe */}
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontWeight: 500 }}>Dòng xe</span>
              <Checkbox.Group
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 8,
                }}
                onChange={(values) => handleFilterChange({ Models: values })}
              >
                <Checkbox value="Swift">Swift</Checkbox>
                <Checkbox value="Civic">Civic</Checkbox>
                <Checkbox value="series3">Series 3</Checkbox>
              </Checkbox.Group>
            </div>

            {/* Giá */}
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontWeight: 500 }}>Giá thuê</span>
              <Checkbox.Group
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 8,
                }}
                onChange={(values) =>
                  handleFilterChange({ priceRange: values })
                }
              >
                <Checkbox value={"0, 1000000]"}>Dưới 1 triệu</Checkbox>
                <Checkbox value={"1000000, 2000000"}>1 - 2 triệu</Checkbox>
                <Checkbox value={"2000000, 5000000"}>2 - 5 triệu</Checkbox>
                <Checkbox value={"5000000, 999999999"}>Trên 5 triệu</Checkbox>
              </Checkbox.Group>
            </div>

            <Button
              type="primary"
              block
              onClick={() => {
                handleSubmitFilter();
              }}
            >
              Áp dụng
            </Button>
          </Sider>
          <Content style={{ padding: "0 24px" }}>
            <section className="cars">
              <h2 style={{ textAlign: "center", marginBottom: 30 }}>
                🚗 Danh sách xe nổi bật
              </h2>

              <List
                loading={loading}
                grid={{ gutter: 24, column: 3 }}
                itemLayout="vertical"
                size="large"
                pagination={{
                  current: pagination.current,
                  pageSize: 5,
                  total: pagination.total,
                  onChange: (page, size) => handleGetCar(page, size),
                }}
                dataSource={car}
                renderItem={(item) => (
                  <List.Item key={item.id} style={{ padding: 0 }}>
                    <Card
                      hoverable
                      style={{
                        borderRadius: 12,
                        overflow: "hidden",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      cover={
                        <Carousel autoplay>
                          {item.carImages && item.carImages.length > 0 ? (
                            item.carImages.map((img) => (
                              <img
                                key={img.id}
                                alt={item.carModel?.name}
                                src={`http://localhost:8080/storage/car_images/${img.url}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ))
                          ) : (
                            <img
                              alt="default"
                              src="/default-car.jpg"
                              style={{ height: 200, objectFit: "cover" }}
                            />
                          )}
                        </Carousel>
                      }
                    >
                      <Meta
                        title={
                          <span style={{ fontSize: 18, fontWeight: 600 }}>
                            {item.carModel?.brand.name} {item.carModel?.name}
                          </span>
                        }
                        description={
                          <div>
                            <div style={{ margin: "8px 0", color: "#666" }}>
                              {item.available ? "✅ Còn xe" : "❌ Hết xe"}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {Array.from({ length: 5 }).map((_, index) => (
                                <StarOutlined
                                  key={index}
                                  style={{
                                    fontSize: 16,
                                    marginRight: 4,
                                    color: "#faad14",
                                  }}
                                />
                              ))}
                              <span style={{ marginLeft: 8, color: "#999" }}>
                                (4.5) 120 Reviews
                              </span>
                            </div>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                color: "#1890ff",
                                marginTop: 8,
                              }}
                            >
                              {item?.price.toLocaleString("vi-VN")} đ / ngày
                            </div>
                          </div>
                        }
                      />
                      <Link to={`/car/${item.id}`}>
                        <Button
                          type="primary"
                          block
                          style={{
                            marginTop: 12,
                            borderRadius: 8,
                            height: 40,
                          }}
                          // disabled={!car.available}
                        >
                          Thuê xe
                        </Button>
                      </Link>
                    </Card>
                  </List.Item>
                )}
              />
            </section>
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

export default CarListPage;
