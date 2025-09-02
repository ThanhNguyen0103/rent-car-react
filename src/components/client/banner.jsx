import { Button, Col, Row } from "antd";
import { ArrowRightOutlined, LikeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import carRight from "../../assets/car-right.png";

const Banner = () => {
  return (
    <section className="section-banner">
      <div style={{ margin: "0 100px" }}>
        <Row>
          <Col span={12}>
            <p className="banner-text">
              <LikeOutlined style={{ color: "#eda600", marginRight: 4 }} />
              100% Trusted and Reliable Car Sales Platform in the World
            </p>
            <h1 style={{ fontSize: 62, lineHeight: 1 }}>
              Find Your Best <br />
              <span style={{ color: "#eda600" }}>Your Dream Car Awaits</span>
            </h1>
            <p style={{ color: "#787878", fontSize: 16, marginTop: 5 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
            <Link to={"/cars"}>
              <Button
                className="btn-banner"
                size="large"
                style={{
                  marginTop: 10,
                  width: "25%",
                  border: "2px solid #201f1d",
                  color: "#201f1d",
                  backgroundColor: "#fff",
                  fontWeight: 500,
                  fontSize: 15,
                }}
              >
                View all Cars <ArrowRightOutlined />
              </Button>
            </Link>
          </Col>
          <Col span={12}>
            <div className="banner-img">
              <img src={carRight} alt="banner" style={{ maxWidth: "100%" }} />
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Banner;
