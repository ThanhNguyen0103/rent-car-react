import { createContext, useContext, useEffect, useState } from "react";
import { callApiLogin, callGetAccount } from "../service/service-api";

import { message } from "antd";

export const UserContext = createContext();
// custom hook gọn hơn
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [bookingValues, setBookingValues] = useState(() => {
    return JSON.parse(sessionStorage.getItem("bookingValues")) || null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetAccount();
  }, []);

  const handleGetAccount = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await callGetAccount();
      if (res && res.data) {
        setUser(res.data);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveBooking = (values) => {
    setBookingValues(values);
    sessionStorage.setItem("bookingValues", JSON.stringify(values));
  };
  const clearBooking = () => {
    sessionStorage.removeItem("bookingValues");
    setBookingValues(null);
  };

  const handleLogin = async (value) => {
    try {
      const res = await callApiLogin(value);
      if (res && res.data) {
        localStorage.setItem("access_token", res.data.accessToken);
        setUser(res.data.user);
        message.success("Đăng nhập thành công");
      }
      return res.data.user;
    } catch (error) {
      message.error(error.error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, handleLogin, saveBooking, bookingValues, clearBooking }}
    >
      {!loading && children}
    </UserContext.Provider>
  );
};
