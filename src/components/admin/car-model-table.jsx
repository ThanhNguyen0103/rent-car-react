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
import { callGetCarBrand } from "../../service/service-api";
const CarModelTable = ({
  handleGetCarModel,
  handleUpdateCarModel,
  handleCreateCarModel,
  handleDeleteCarModel,
  handleGetCarModelById,
}) => {
  const actionRef = useRef();
  const [formSubmit] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeSubmit, setTypeSubmit] = useState("");
  const [brand, setBrand] = useState();
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
      title: "Tên mẫu xe",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Hãng xe",
      dataIndex: ["brand", "name"], // lấy brand.name
      key: "brand",
      align: "center",
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
  const showModal = async (record) => {
    formSubmit.resetFields();
    setIsModalOpen(true);
    formSubmit.setFieldsValue(record);
    const res = await callGetCarBrand();
    setBrand(res.data.result);
  };
  const handleCancel = () => {
    formSubmit.resetFields();
    setIsModalOpen(false);
  };
  // --------
  const confirm = async (id) => {
    await handleDeleteCarModel(id);
    actionRef.current.reload();
  };
  const cancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };
  // ------

  const handleSubmit = async () => {
    try {
      formSubmit.validateFields();
      const req = await formSubmit.getFieldsValue();

      if (typeSubmit == "update") {
        await handleUpdateCarModel(req);
        setIsModalOpen(false);
        actionRef.current.reload();
      } else {
        await handleCreateCarModel(req);
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
  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        bordered
        request={async (params, sort, filter) => {
          const res = await handleGetCarModel(params, sort, filter);
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
        headerTitle="Danh sách mẫu xe"
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
        title={typeSubmit == "create" ? "Tạo mẫu xe " : "Cập nhật mẫu xe"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={600}
        align="center"
        okText={typeSubmit == "create" ? "Tạo mới" : "Cập nhật"}
        cancelText="Hủy"
      >
        {typeSubmit === "create" && (
          <Form form={formSubmit} layout="vertical" className="car-form">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Hãng xe"
                  name={["brand", "id"]}
                  rules={[{ required: true, message: "Vui lòng chọn hãng xe" }]}
                >
                  <Select
                    placeholder="Chọn hãng xe"
                    showSearch
                    optionFilterProp="children"
                  >
                    {brand
                      ?.filter((item) => !item.isHidden) // isHidden = true → ẩn
                      .map((item) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item?.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tên mẫu xe"
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập mẫu xe" }]}
                >
                  <Input placeholder="Ví dụ: Toyota Camry 2.5Q" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
        {typeSubmit === "update" && (
          <Form form={formSubmit} layout="vertical" className="car-form">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Hãng xe"
                  name={["brand", "id"]}
                  rules={[{ required: true, message: "Vui lòng chọn hãng xe" }]}
                >
                  <Select
                    placeholder="Chọn hãng xe"
                    showSearch
                    optionFilterProp="children"
                  >
                    {brand?.slice(0, 2).map((item) => (
                      <Select.Option key={item?.id} value={item?.id}>
                        {item?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tên mẫu xe"
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập số chỗ" }]}
                >
                  <Input placeholder="Ví dụ: Toyota Camry 2.5Q" />
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
export default CarModelTable;
