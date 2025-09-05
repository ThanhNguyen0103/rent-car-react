import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import {
  Button,
  Col,
  Descriptions,
  Drawer,
  Form,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
} from "antd";
import { useRef, useState } from "react";

const UserTable = ({
  handleUpdateUser,
  handleDeleteUser,
  handleGetUser,
  handleCreateUser,
  handleGetUserById,
}) => {
  const actionRef = useRef();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeSubmit, setTypeSubmit] = useState("");
  const [open, setOpen] = useState(false);
  const [user, SetUser] = useState({});
  // --------------//
  const handleSubmit = async () => {
    try {
      if (typeSubmit == "update") {
        form.validateFields();
        await handleUpdateUser(form.getFieldsValue());

        setIsModalOpen(false);
        actionRef.current.reload();
      } else {
        form.validateFields();
        await handleCreateUser(form.getFieldsValue());
        setIsModalOpen(false);
        actionRef.current.reload();
      }
    } catch (error) {
      message.error(error.message);
      console.log(error.error);
      const fields = Object.entries(error.error).map(([key, value]) => ({
        name: key,
        errors: [value],
      }));
      console.log(fields);
      form.setFields(fields);
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const showModal = (record) => {
    form.resetFields();
    setIsModalOpen(true);
    form.setFieldsValue(record);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const confirm = async (id) => {
    await handleDeleteUser(id);
    actionRef.current.reload();
  };
  const cancel = (e) => {
    console.log(e);
  };

  const showDrawer = async (id) => {
    const res = await handleGetUserById(id);
    if (res.data) {
      SetUser(res.data);
    }
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (id) => (
        <a
          onClick={() => {
            showDrawer(id);
          }}
        >
          {id}
        </a>
      ),

      key: "id",
      width: 50,
      hideInSearch: true,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 50,
      sorter: true,
      align: "center",
    },
    {
      title: "Role",
      dataIndex: ["role", "name"],
      key: "role",
      width: 50,
      align: "center",
      hideInSearch: true,
    },

    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      hideInSearch: true,
      width: 200,
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      sorter: true,
      key: "updatedAt",
      hideInSearch: true,
      width: 200,
    },

    {
      title: "Action",
      key: "action",
      width: 50,
      hideInSearch: true,
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ fontSize: 20, color: "rgb(255, 165, 0)" }}
            onClick={() => {
              showModal(record);
              setTypeSubmit("update");
            }}
          />

          <Popconfirm
            title="Delete user"
            description="Bạn có muốn xóa user ?"
            onConfirm={() => {
              confirm(record.id);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ color: "rgb(255, 77, 79)", fontSize: 20 }}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        bordered
        request={async (params, sort, filter) => {
          const res = await handleGetUser(params, sort, filter);
          return {
            data: res.result,
            success: true,
            total: res.meta.total,
          };
        }}
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "pro-table-singe-demos",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
        }}
        rowKey="id"
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          syncToUrl: (values, type) => {
            if (type === "get") {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="User Table"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              showModal();
              setTypeSubmit("create");
            }}
            type="primary"
          >
            Thêm mới
          </Button>,
        ]}
      />
      <Modal
        title={typeSubmit == "create" ? "Tạo mới User" : "Update User"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={900}
        okText={typeSubmit == "create" ? "Tạo mới" : "Cập nhật"}
        cancelText="Hủy"
      >
        {typeSubmit === "update" && (
          <Form
            layout={formLayout}
            form={form}
            onFinish={onFinish}
            initialValues={{ layout: formLayout }}
            style={{ w: formLayout === "inline" ? "none" : 1000 }}
          >
            <Row gutter={16}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { type: "email", message: "Email không hợp lệ" },
                  ]}
                  label="Email"
                  name="email"
                >
                  <Input disabled placeholder="Nhập email  " />
                </Form.Item>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Item
                  rules={[
                    { required: true, message: "Vui lòng nhập tên" },
                    {
                      type: "string",
                      min: 6,
                      message: "Tên phải có ít nhất 6 ký tự",
                    },
                  ]}
                  label="Tên hiển thị"
                  name="fullName"
                >
                  <Input id="modal-name" placeholder="Nhập tên hiển thị" />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Item
                  rules={[
                    { required: true, message: "Vui lòng nhập tuổi" },
                    {
                      type: "number",
                      min: 18,
                      max: 99,
                      message: "Tuổi từ 18 đến 99",
                    },
                  ]}
                  label="Tuổi"
                  name="age"
                >
                  <Input id="modal-age" placeholder="Nhập tuổi" />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Item
                  rules={[
                    { required: true, message: "Vui lòng chọn giới tính" },
                  ]}
                  label="Giới tính"
                  name="gender"
                >
                  <Select placeholder="Chọn giới tính">
                    <Select.Option value="FEMALE">Female</Select.Option>
                    <Select.Option value="MALE">Male</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Item
                  rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
                  label="Vai trò"
                  name={["role", "id"]}
                >
                  <Select placeholder="Chọn vai trò">
                    <Select.Option value={1}>Admin</Select.Option>
                    <Select.Option value={2}>User</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                  label="Địa chỉ"
                  name="address"
                >
                  <Input placeholder="Nhập địa chỉ" />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="ID" name="id" hidden>
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
        {typeSubmit === "create" && (
          <Form
            layout={formLayout}
            form={form}
            onFinish={onFinish}
            initialValues={{ layout: formLayout }}
            style={{ w: formLayout === "inline" ? "none" : 1000 }}
          >
            <Row gutter={16}>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { required: true, message: "Vui lòng nhập email" },
                    { type: "email", message: "Email không hợp lệ" },
                  ]}
                  label="Email"
                  name="email"
                >
                  <Input placeholder="Nhập email  " />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  rules={[
                    { required: true, message: "Vui lòng nhập password" },
                  ]}
                  label="Password"
                  name="password"
                >
                  <Input.Password placeholder="Nhập password" />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Item
                  rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                  label="Tên hiển thị"
                  name="fullName"
                >
                  <Input id="modal-name" placeholder="Nhập tên hiển thị" />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Item
                  rules={[{ required: true, message: "Vui lòng nhập tuổi" }]}
                  label="Tuổi"
                  name="age"
                >
                  <Input id="modal-age" placeholder="Nhập tuổi" />
                </Form.Item>
              </Col>
              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Item
                  rules={[
                    { required: true, message: "Vui lòng chọn giới tính" },
                  ]}
                  label="Giới tính"
                  name="gender"
                >
                  <Select placeholder="Chọn giới tính">
                    <Select.Option value="FEMALE">Female</Select.Option>
                    <Select.Option value="MALE">Male</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12}>
                <Form.Item
                  rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
                  label="Vai trò"
                  name={["role", "id"]}
                >
                  <Select placeholder="Chọn vai trò">
                    <Select.Option value={1}>Admin</Select.Option>
                    <Select.Option value={2}>User</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                  label="Địa chỉ"
                  name="address"
                >
                  <Input placeholder="Nhập địa chỉ" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>

      <Drawer
        title="Chi tiết User"
        placement="right"
        width={400}
        onClose={onClose}
        open={open}
      >
        {user ? (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="ID">{user?.id}</Descriptions.Item>
            <Descriptions.Item label="Tên">{user?.fullName}</Descriptions.Item>
            <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="Role">
              {user?.role?.name}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>Không có dữ liệu user</p>
        )}
        <div style={{ marginTop: 20 }}>
          <h4 style={{ marginBottom: 10 }}>Avatar:</h4>
          <div className="user-avatar">
            <Image
              key={1}
              src="http://localhost:8080/storage/resume/1752250166033-hinh1.jpg"
              width={150}
              style={{ marginRight: 10, borderRadius: 8 }}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};
export default UserTable;
