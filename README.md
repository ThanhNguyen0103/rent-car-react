# 🚗 Rental Car Frontend

- Ứng dụng frontend hiển thị danh sách xe cho thuê, được xây dựng bằng **React** và **Ant Design**.

- ⚠️ Lưu ý: Repository này chỉ chứa frontend.  
  Backend (**car-rent-java**) cần chạy để frontend hoạt động đúng.

## 📌 Công nghệ sử dụng

- [React](https://react.dev/) (hooks, functional components)
- [Ant Design](https://ant.design/) (UI library)
- [React Router](https://reactrouter.com/) (điều hướng)
- [Axios](https://axios-http.com/) (gọi API)
- [Carousel](https://ant.design/components/carousel) (hiển thị nhiều ảnh xe)

## 🖼️ Tính năng (Features)

- Chung

  - Xem danh sách xe có sẵn để thuê
  - Đăng nhập và đăng ký trong hệ thống

- Người dùng (User)

  - Thuê xe
  - Xem danh sách các lần thuê
  - Kiểm tra trạng thái thuê hiện tại và lịch sử thuê
  - Xem thông tin cá nhân đơn giản và đổi mật khẩu tài khoản

- Quản trị viên (Administrator)

  - Quản lý xe: xem thông tin, chỉnh sửa, đổi ảnh, xóa, thay đổi trạng thái hiển thị
  - Quản lý thuê xe: xem thông tin, chỉnh sửa, xóa, thay đổi trạng thái
  - Quản lý người dùng: xem danh sách, thêm mới, xóa, thay đổi vai trò

- Frontend / UX
  - Carousel ảnh xe, tự động trượt
  - Pagination (phân trang) với Ant Design List
  - Filter / Lọc xe theo giá, loại xe, fuel type, vị trí
  - Nút Rent Now dẫn đến trang chi tiết xe

## ⚙️ Cài đặt

1. Clone repo:

   ```bash
   git clone https://github.com/ThanhNguyen0103/rent-car-react.git
   cd rent-car-react
   ```

2. Cài dependency:
   ```bash
   npm install
   ```
3. Chạy ứng dụng:
   ```bash
   npm start
   ```

## 🖼️ Hình ảnh demo giao diện

### Trang chủ

![Trang chủ Rental Car](public/hinh1.png)

### Trang chi tiết xe

![Danh sách xe](public/hinh2.png)

### Trang thông tin người dùng

![Thông tin người dùng](public/hinh3.png)

🚀 Hướng phát triển

- Thêm Reposive ở mobile

- Triển khai frontend lên Vercel/Netlify, backend lên Render/Heroku

- Thêm review thực tế từ người dùng

- Tối ưu performance và SEO
