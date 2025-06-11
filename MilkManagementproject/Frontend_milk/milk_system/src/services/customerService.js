import axios from "axios";

const API_URL = "http://localhost:8080/api/customers";

export const getAllCustomers = () => axios.get(API_URL);
export const addCustomer = (customer) => axios.post(API_URL, customer);
export const getCustomerById = (id) => axios.get(`${API_URL}/${id}`);
export const updateCustomer = (id, customer) => axios.put(`${API_URL}/${id}`, customer);
export const deleteCustomer = (id) => axios.delete(`${API_URL}/${id}`);