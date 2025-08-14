import instance from "./service-api-custom";

// module user
export const callCreateUser = (name, address, description, age) => {
  return instance.post("/api/v1/users", { name, address, age, description });
};
export const callUpdateUser = (value) => {
  return instance.put("/api/v1/users", value);
};
export const callDeleteUser = (id) => {
  return instance.delete(`/api/v1/users/${id}`);
};
export const callGetUserById = (id) => {
  return instance.get(`/api/v1/users/${id}`);
};
export const callGetUser = (query) => {
  return instance.get(`/api/v1/users?${query}`);
  // return instance.get(`/api/v1/users`);
};
