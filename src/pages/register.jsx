import React, { useState } from "react";
import { Form, Input, Button, message, Row, Col, Select } from "antd";
import { callRegister } from "../service/service-api";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formLayout, setFormLayout] = useState("vertical");
  const onFinish = async (values) => {
    try {
      await callRegister(values);
      message.success(`Đăng ký tài khoản thành công ! `);
      form.resetFields();
      navigate("/login");
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Vui lòng kiểm tra lại thông tin!");
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
          marginTop: 50,
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
            Please register to your account
          </p>
        </div>
        <Form
          form={form}
          name="register"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ margin: "0 auto", padding: 20, width: 400 }}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng!" },
            ]}
          >
            <Input placeholder="Nhập tên người dùng" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ marginTop: 10 }}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
