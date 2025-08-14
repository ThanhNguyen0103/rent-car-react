import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ProTable from "@ant-design/pro-table";
import {
  Button,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import { useRef, useState } from "react";

const UserTable = ({
  data,
  handleUpdateUser,
  handleDeleteUser,
  handleGetUser,
}) => {
  const actionRef = useRef();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const showModal = (value) => {
    form.resetFields();
    setIsModalOpen(true);
    form.setFieldsValue(value);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    await handleUpdateUser(form.getFieldsValue());
    actionRef.current.reload();
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
    // message.error("Click on No");
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 50,
      hideInSearch: true,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 50,
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
              showModal(record);
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
          pageSize: 5,
          // onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="User Table"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {}}
            type="primary"
          >
            Thêm mới
          </Button>,
        ]}
      />
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout={formLayout}
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
  // return (
  //   <>

  //     <Table columns={columns} rowKey="id" dataSource={data} />
  //     <Modal
  //       title="Basic Modal"
  //       closable={{ "aria-label": "Custom Close Button" }}
  //       open={isModalOpen}
  //       onOk={handleOk}
  //       onCancel={handleCancel}
  //     >
  //       <Form
  //         layout={formLayout}
  //         form={form}
  //         onFinish={onFinish}
  //         initialValues={{ layout: formLayout }}
  //         style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
  //       >
  //         <Form.Item label="Full Name" name="fullName">
  //           <Input placeholder="Nhập tên " />
  //         </Form.Item>
  //         <Form.Item label="ID" name="id">
  //           <Input placeholder="input placeholder" />
  //         </Form.Item>
  //       </Form>
  //     </Modal>

  //   </>
  // );
};
export default UserTable;
