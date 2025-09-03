import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";
import { useUserContext } from "../components/auth";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/global.css";
const LoginPage = () => {
  const { handleLogin } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const onFinish = async ({ username, password }) => {
    const res = await handleLogin({ username, password });
    res ? navigate(from, { replace: true }) : "";
  };

  return (
    <div
      style={{
        minHeight: "100vh", // chiếm full màn hình
        display: "flex", // dùng flexbox
        justifyContent: "center", // căn giữa ngang
        alignItems: "center", // căn giữa dọc
        background: "#f5f5f5", // màu nền nhẹ
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(255 255 255)",
          padding: 40,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="logo"
            style={{ width: 60, marginBottom: 8 }}
          />
          <h2 style={{ margin: 0 }}>Welcome to ...</h2>
          <p style={{ color: "#888", margin: 0 }}>
            Please login to your account
          </p>
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ width: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
          <span style={{ marginLeft: "20%" }}>
            Don't have an account? <a href="">Sign up now!</a>
          </span>
        </Form>
      </div>
    </div>
  );
};
export default LoginPage;
