import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
} from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
import { useRef, useState } from "react";

const RentalTable = ({
  handleUpdateRental,
  handleDeleteRental,
  handleGetRental,
  handleCreateRental,
  handleGetRentalById,
}) => {
  const actionRef = useRef();
  const [formSubmit] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeSubmit, setTypeSubmit] = useState("");
  const [rental, setRental] = useState();
  const showModal = async (record) => {
    formSubmit.resetFields();
    setIsModalOpen(true);
    setRental(record);
    formSubmit.setFieldsValue(record);
  };
  const handleCancel = () => {
    formSubmit.resetFields();
    setIsModalOpen(false);
  };
  // --------
  const confirm = async (id) => {
    await handleDeleteRental(id);
    actionRef.current.reload();
  };
  const cancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };
  // ------
  const handleSubmit = async () => {
    try {
      const values = await formSubmit.validateFields();
      const req = await formSubmit.getFieldsValue();

      if (typeSubmit == "update") {
        await handleUpdateRental(req);
        setIsModalOpen(false);
        actionRef.current.reload();
      } else {
        await handleCreateRental(req);
        setIsModalOpen(false);
        actionRef.current.reload();
      }
    } catch (error) {
      message.error("Validate Failed");
      const fields = Object.entries(error.errorFields).map(([key, value]) => ({
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
      title: "Khách thuê",
      dataIndex: ["user", "email"],
      key: "user",
      align: "center",
    },
    {
      title: "Điểm đón",
      dataIndex: "pickupLocation",
      key: "pickupLocation",
      align: "center",
      hideInSearch: true,
    },
    {
      title: "Điểm trả",
      dataIndex: "dropoffLocation", // lấy brand.name
      key: "dropoffLocation",
      align: "center",
      hideInSearch: true,
    },
    {
      title: "Tổng giá tiền",
      dataIndex: "totalPrice", // lấy brand.name
      key: "totalPrice",
      align: "center",
      render: (price) => price?.toLocaleString("vi-VN") + " ₫",
    },
    {
      title: "Trạng thái",
      dataIndex: "status", // lấy brand.name
      key: "status",
      align: "center",
      render: (status) => {
        const map = {
          PENDING: "Đang chờ",
          APPROVED: "Đã duyệt",
          CANCELLED: "Đã hủy",
          COMPLETED: "Hoàn thành",
        };
        return map[status] || status;
      },
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: "UpdatedAt",
      dataIndex: "updatedAt",
      sorter: true,
      key: "updatedAt",
      hideInSearch: true,
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
  return (
    <>
      {" "}
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        bordered
        request={async (params, sort, filter) => {
          const res = await handleGetRental(params, sort, filter);
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
        headerTitle="Danh sách đơn hàng"
        toolBarRender={() => [
          <Button
            disabled
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
        title={typeSubmit == "create" ? "Tạo đơn hàng " : "Cập nhật đơn hàng"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        width={1000}
        align="center"
        okText={typeSubmit == "create" ? "Tạo mới" : "Cập nhật"}
        cancelText="Hủy"
      >
        {typeSubmit === "create" && (
          <Form form={formSubmit} layout="vertical" className="car-form">
            <Row gutter={16}></Row>
          </Form>
        )}
        {typeSubmit === "update" && (
          <Form
            form={formSubmit}
            // initialValues={{
            //   startDate: rental?.startDate ? dayjs(rental.startDate) : null,
            //   endDate: rental?.endDate ? dayjs(rental.endDate) : null,
            // }}
            layout="vertical"
            className="car-form"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="status" label="Trạng thái">
                  <Select>
                    <Option value="PENDING">Pending</Option>
                    <Option value="CONFIRMED">Confirmed</Option>
                    <Option value="COMPLETED">Completed</Option>
                    <Option value="CANCELED">Canceled</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="pickupLocation"
                  rules={[{ required: true, message: "Chọn điểm nhận xe" }]}
                  label="Điểm nhận xe"
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dropoffLocation"
                  rules={[{ required: true, message: "Chọn điểm trả xe" }]}
                  label="Điểm trả xe"
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name="startDate"
                  label="Chọn ngày bắt đầu "
                  rules={[{ required: true, message: "Chọn ngày bắt đầu" }]}
                  getValueProps={(value) => ({
                    value: value ? dayjs(value) : "",
                  })}
                >
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="endDate"
                  label="Chọn ngày kết thúc "
                  rules={[{ required: true, message: "Chọn ngày kết thúc" }]}
                  getValueProps={(value) => ({
                    value: value ? dayjs(value) : "",
                  })}
                >
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="id" hidden>
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
export default RentalTable;
