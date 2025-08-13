import { Button, Form, Input, Modal, Space, Table, Tag } from "antd";
import {
  callGetUser,
  callGetUserById,
  callUpdateUser,
} from "../../service/service-api";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const UserPage = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [data, setData] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const showModal = (value) => {
    setIsModalOpen(true);
    form.setFieldsValue(value);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleUpdateUser(form.getFieldsValue());
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    handleGetUser();
  }, []);
  const handleUpdateUser = async (value) => {
    const res = await callUpdateUser(value);
  };
  const handleGetUser = async (id) => {
    const res = await callGetUser();
    setData(res.data.result);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              showModal(record);
            }}
          />
          <DeleteOutlined style={{ color: "red", fontSize: 16 }} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} rowKey="id" dataSource={data} />
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout={formLayout}
          //   setFieldsValue={(record) => {
          //     console.log(record);
          //   }}
          form={form}
          onFinish={onFinish}
          initialValues={{ layout: formLayout }}
          style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
        >
          <Form.Item label="Full Name" name="fullName">
            <Input placeholder="Nhập tên " />
          </Form.Item>
          <Form.Item label="ID" name="id">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
