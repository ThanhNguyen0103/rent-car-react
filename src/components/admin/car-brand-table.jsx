import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
} from "antd";
import { useEffect, useRef, useState } from "react";
const CarBrandTable = ({
  handleGetCarBrand,
  handleUpdateCarBrand,
  handleCreateCarBrand,
  handleDeleteCarBrand,
  handleGetCarBrandById,
}) => {
  const actionRef = useRef();
  const [formSubmit] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeSubmit, setTypeSubmit] = useState("");
  const handleCancel = () => {
    formSubmit.resetFields();
    setIsModalOpen(false);
  };
  const showModal = async (record) => {
    formSubmit.resetFields();
    formSubmit.setFieldsValue(record);
    setIsModalOpen(true);
  };
  const handleSubmit = async () => {
    try {
      formSubmit.validateFields();
      const req = await formSubmit.getFieldsValue();

      if (typeSubmit == "update") {
        await handleUpdateCarBrand(req);
        setIsModalOpen(false);
        actionRef.current.reload();
      } else {
        await handleCreateCarBrand(req);
        setIsModalOpen(false);
        actionRef.current.reload();
      }
    } catch (error) {
      message.error(error.message);
      const fields = Object.entries(error.error).map(([key, value]) => ({
        name: key,
        errors: [value],
      }));
      formSubmit.setFields(fields);
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 50,
      hideInSearch: true,
      align: "center",
      render: (id) => <a>{id}</a>,
    },

    {
      title: "Hãng xe",
      dataIndex: "name", // lấy brand.name
      key: "name",
      align: "center",
      width: 150,
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
      key: "updatedAt ",
      hideInSearch: true,
      width: 200,
    },
    {
      title: "Action",
      key: "action",
      width: 50,
      hideInSearch: true,
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ fontSize: 20, color: "rgb(255, 165, 0)" }}
            onClick={() => {
              setTypeSubmit("update");
              showModal(record);
            }}
          />

          <Popconfirm
            title="Delete user"
            description="Bạn có muốn xóa user ?"
            onConfirm={() => {
              confirm(record.id);
            }}
            onCancel={() => {}}
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
          const res = await handleGetCarBrand(params, sort, filter);
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
          // onChange(value) {
          //   console.log("value: ", value);
          // },
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
          // onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="Danh sách hãng xe"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              setTypeSubmit("create");
              showModal();
            }}
            type="primary"
          >
            Thêm mới
          </Button>,
        ]}
      />
      <Modal
        title={typeSubmit == "create" ? "Tạo hãng xe " : "Cập nhật hãng xe"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={500}
        align="center"
        okText={typeSubmit == "create" ? "Tạo mới" : "Cập nhật"}
        cancelText="Hủy"
      >
        {typeSubmit === "create" && (
          <Form form={formSubmit} layout="horizontal" className="car-form">
            <Row gutter={16}>
              <Col span={18}>
                <Form.Item
                  label="Tên mẫu xe"
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập hãng xe" }]}
                >
                  <Input placeholder="Ví dụ: Toyota " />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
        {typeSubmit === "update" && (
          <Form form={formSubmit} layout="horizontal" className="car-form">
            <Row gutter={16}>
              <Col span={18}>
                <Form.Item
                  label="Tên mẫu xe"
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập hãng xe" }]}
                >
                  <Input placeholder="Ví dụ: Toyota " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tên mẫu xe" name="id" hidden>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>
    </>
  );
};
export default CarBrandTable;
