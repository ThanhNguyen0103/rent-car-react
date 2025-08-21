import { message, notification } from "antd";
import {
  callCreateRental,
  callDeleteRental,
  callGetRental,
  callGetRentalById,
  callUpdateRental,
} from "../../service/service-api";
import RentalTable from "../../components/admin/rental-table";

const RentalPage = () => {
  const handleGetRental = async (params, sort, filter) => {
    let page = params.current;
    let size = params.pageSize;
    let sortField = Object.keys(sort)[0];
    let sortOrder = "";

    if (sortField === "createdAt") {
      sortOrder =
        sort[sortField] === "ascend"
          ? "&sort=createdAt,asc"
          : "&sort=createdAt,desc";
    }
    if (sortField === "updatedAt") {
      sortOrder =
        sort[sortField] === "ascend"
          ? "&sort=updatedAt,asc"
          : "&sort=updatedAt,desc";
    }

    let query = `page=${page}&size=${size}${sortOrder}`;

    const res = await callGetRental(query);
    return res.data;
  };
  const handleUpdateRental = async (value) => {
    const res = await callUpdateRental(value);
    if (res.data) {
      message.success("Cập nhật đơn hàng thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const handleCreateRental = async (value) => {
    const res = await callCreateRental(value);

    if (res.data) {
      message.success("Tạo đơn hàng thành công");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };
  const handleDeleteRental = async (id) => {
    const res = await callDeleteRental(id);
    if (res) {
      message.success("Xóa xe thành công ");
    }
  };
  const handleGetRentalById = async (id) => {
    const res = await callGetRentalById(id);
    return res;
  };

  return (
    <RentalTable
      handleUpdateRental={handleUpdateRental}
      handleDeleteRental={handleDeleteRental}
      handleGetRental={handleGetRental}
      handleCreateRental={handleCreateRental}
      handleGetRentalById={handleGetRentalById}
    />
  );
};
export default RentalPage;
