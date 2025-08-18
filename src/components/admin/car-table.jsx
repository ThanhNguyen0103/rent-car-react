import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";

import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { use, useEffect } from "react";
import { useRef, useState } from "react";
import { callUpLoadFile } from "../../service/service-api";
const CarTable = ({
  handleUpdateCar,
  handleDeleteCar,
  handleGetCar,
  handleCreateCar,
}) => {
  const actionRef = useRef();
  const [formSubmit] = Form.useForm();
  const [formLayout, setFormLayout] = useState("vertical");
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeSubmit, setTypeSubmit] = useState("");
  const [listFile, setListFile] = useState([]);
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
      title: "Mẫu xe",
      dataIndex: ["carModel", "name"],
      key: "carModel",
      sorter: true,
      align: "center",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      align: "center",
      hideInSearch: true,
      render: (available) =>
        available ? (
          <span>
            <CheckCircleTwoTone twoToneColor="#52c41a" /> Available
          </span>
        ) : (
          <span>
            <CloseCircleTwoTone twoToneColor="#ff4d4f" /> Not Available
          </span>
        ),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      align: "center",
      hideInSearch: true,
      width: 50,
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "center",
      sorter: true,
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

  useEffect(() => {}, []);

  const showModal = (record) => {
    formSubmit.resetFields();
    setIsModalOpen(true);

    if (record && record.carImages) {
      formSubmit.setFieldsValue(record);
      const files = record.carImages.map((img) => ({
        uid: img.id,
        name: `image-1755443134509-1716687909879-google.png`,
        status: "done",
        url: `http://localhost:8080/storage/car_images/${img.url}`,
      }));
      setListFile(files);
    }
  };

  const handleCancel = () => {
    formSubmit.resetFields();
    setIsModalOpen(false);
    setListFile([]);
  };
  // ------//
  const confirm = async (id) => {
    await handleDeleteCar(id);
    actionRef.current.reload();
  };
  const cancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };
  // -------
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  // -----
  const showDrawer = (id) => {
    setOpen(true);
    handleGetUserById(id);
  };
  const onClose = () => {
    setOpen(false);
  };
  // -------
  const handleSubmit = async () => {
    try {
      formSubmit.validateFields();
      const values = await formSubmit.getFieldsValue();

      let oldFiles = [];
      if (values && values.upload) {
        oldFiles = values.upload.fileList
          .filter((item) => !item.originFileObj)
          .map((item) => ({ id: item.uid }));
      }

      const car = {
        ...(values.id ? { id: values.id } : {}),
        description: values.description,
        price: values.price,
        capacity: values.capacity,
        available: values.available,
        carModel: { id: values.carModel.id },
        carImages: oldFiles,
      };

      // Tạo FormData
      const formData = new FormData();
      formData.append("car", JSON.stringify(car));
      formData.append("folder", "car_images");

      // Nếu có upload ảnh
      if (values.upload && values.upload.length > 0) {
        values.upload.forEach((file) => {
          if (file.originFileObj) {
            formData.append("files", file.originFileObj);
          }
        });
      }

      if (typeSubmit == "update") {
        if (values.upload && values.upload.fileList) {
          values.upload.fileList.forEach((file) => {
            if (file.originFileObj) {
              formData.append("files", file.originFileObj);
            }
          });
        }
        await handleUpdateCar(formData);
        setIsModalOpen(false);
        actionRef.current.reload();
      } else {
        console.log(values.upload);
        await handleCreateCar(formData);
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
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        bordered
        request={async (params, sort, filter) => {
          const res = await handleGetCar(params, sort, filter);
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
        headerTitle="Car Table"
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
        title={typeSubmit == "create" ? "Tạo mới xe" : "Cập nhật xe"}
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
          // <Form
          //   form={formSubmit}
          //   // labelCol={{ span: 4 }}
          //   // wrapperCol={{ span: 14 }}
          //   layout="horizontal"
          //   style={{ maxWidth: 600 }}
          // >
          //   <Row gutter={16}>
          //     <Col lg={24} md={24} sm={24} xs={24}>
          //       <Form.Item
          //         label="Dòng xe"
          //         name={["carModel", "id"]}
          //         rules={[{ required: true, message: "Vui lòng chọn dòng xe" }]}
          //       >
          //         <Select>
          //           <Select.Option value={4}>Civic</Select.Option>
          //         </Select>
          //         {/* <Select
          //       placeholder="Chọn dòng xe"
          //       // options={carModels.map((m) => ({
          //       //   label: m.name,
          //       //   value: m.id,
          //       // }))}
          //       options={

          //       }
          //     /> */}
          //       </Form.Item>
          //     </Col>
          //     <Col lg={12} md={12} sm={24} xs={24}>
          //       <Form.Item
          //         label="Mô tả"
          //         name="description"
          //         rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          //       >
          //         <TextArea rows={4} placeholder="Ví dụ: Xe mới" />
          //       </Form.Item>
          //     </Col>
          //     <Col lg={12} md={12} sm={24} xs={24}>
          //       <Form.Item
          //         label="Giá thuê/ngày"
          //         name="price"
          //         rules={[
          //           { required: true, message: "Vui lòng nhập giá thuê" },
          //           { type: "number", min: 1, message: "Giá phải lớn hơn 1đ" },
          //         ]}
          //       >
          //         <InputNumber
          //           style={{ width: "100%" }}
          //           min={0}
          //           formatter={(value) => `${value}₫`}
          //           parser={(value) => value.replace("₫", "")}
          //         />
          //       </Form.Item>
          //     </Col>
          //     <Col lg={12} md={12} sm={24} xs={24}>
          //       <Form.Item
          //         label="Số chỗ"
          //         name="capacity"
          //         rules={[{ required: true, message: "Vui lòng nhập số chỗ" }]}
          //       >
          //         <Input placeholder="Ví dụ: 16 chỗ" />
          //       </Form.Item>
          //     </Col>
          //     <Col lg={12} md={12} sm={24} xs={24}>
          //       <Form.Item
          //         label="Trạng thái"
          //         name="available"
          //         valuePropName="checked"
          //         initialValue={true}
          //       >
          //         <Switch checkedChildren="Có sẵn" unCheckedChildren="Hết xe" />
          //       </Form.Item>
          //     </Col>
          //     <Col lg={12} md={12} sm={24} xs={24}>
          //       <Form.Item
          //         label="Upload"
          //         name="upload"
          //         valuePropName="fileList"
          //         getValueFromEvent={normFile}
          //       >
          //         <Upload listType="picture-card" beforeUpload={() => false}>
          //           <button
          //             style={{
          //               color: "inherit",
          //               cursor: "inherit",
          //               border: 0,
          //               background: "none",
          //             }}
          //             type="button"
          //           >
          //             <PlusOutlined />
          //             <div style={{ marginTop: 8 }}>Upload</div>
          //           </button>
          //         </Upload>
          //       </Form.Item>
          //     </Col>
          //   </Row>
          // </Form>
          <Form
            form={formSubmit}
            layout="vertical" // 👉 label trên input
            className="car-form"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Dòng xe"
                  name={["carModel", "id"]}
                  rules={[{ required: true, message: "Vui lòng chọn dòng xe" }]}
                >
                  <Select placeholder="Chọn dòng xe">
                    <Select.Option value={4}>Civic</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Giá thuê/ngày"
                  name="price"
                  rules={[
                    { required: true, message: "Vui lòng nhập giá thuê" },
                    { type: "number", min: 1, message: "Giá phải lớn hơn 1đ" },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    formatter={(value) => `${value}₫`}
                    parser={(value) => value.replace("₫", "")}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Số chỗ"
                  name="capacity"
                  rules={[{ required: true, message: "Vui lòng nhập số chỗ" }]}
                >
                  <Input placeholder="Ví dụ: 16 chỗ" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Trạng thái"
                  name="available"
                  valuePropName="checked"
                  initialValue={true}
                >
                  <Switch checkedChildren="Có sẵn" unCheckedChildren="Hết xe" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <TextArea rows={3} placeholder="Ví dụ: Xe mới, sạch sẽ..." />
            </Form.Item>

            <Form.Item
              label="Upload ảnh"
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload listType="picture-card" beforeUpload={() => false}>
                <PlusOutlined />
                <div style={{ marginLeft: 4 }}>Upload</div>
              </Upload>
            </Form.Item>
          </Form>
        )}
        {typeSubmit === "update" && (
          <Form
            form={formSubmit}
            layout="vertical" //
            className="car-form"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Dòng xe"
                  name={["carModel", "id"]}
                  rules={[{ required: true, message: "Vui lòng chọn dòng xe" }]}
                >
                  <Select placeholder="Chọn dòng xe">
                    <Select.Option value={4}>Civic</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Giá thuê/ngày"
                  name="price"
                  rules={[
                    { required: true, message: "Vui lòng nhập giá thuê" },
                    { type: "number", min: 1, message: "Giá phải lớn hơn 1đ" },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    formatter={(value) => `${value}₫`}
                    parser={(value) => value.replace("₫", "")}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Số chỗ"
                  name="capacity"
                  rules={[{ required: true, message: "Vui lòng nhập số chỗ" }]}
                >
                  <Input placeholder="Ví dụ: 16 chỗ" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Trạng thái"
                  name="available"
                  valuePropName="checked"
                  initialValue={true}
                >
                  <Switch checkedChildren="Có sẵn" unCheckedChildren="Hết xe" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <TextArea rows={3} placeholder="Ví dụ: Xe mới, sạch sẽ..." />
            </Form.Item>

            <Form.Item label="Upload ảnh" name="upload">
              <Upload
                fileList={listFile}
                onChange={({ fileList }) => {
                  console.log(fileList);
                  setListFile(fileList);
                }}
                listType="picture-card"
                beforeUpload={() => false}
              >
                <PlusOutlined />
                <div style={{ marginLeft: 4 }}>Upload</div>
              </Upload>
            </Form.Item>
            <Col span={12}>
              <Form.Item label="Id" name="id">
                <Input placeholder="Ví dụ: 16 chỗ" />
              </Form.Item>
            </Col>
          </Form>
        )}
      </Modal>
    </>
  );
};
export default CarTable;
