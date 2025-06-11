import axios from "axios";

const SALES_API_URL = "http://localhost:8080/api/monthly-sales";

export const getAllSales = () => axios.get(SALES_API_URL);
export const addSale = (sale) => axios.post(SALES_API_URL, sale);
export const getSaleById = (id) => axios.get(`${SALES_API_URL}/${id}`);
export const updateSale = (id, sale) => axios.put(`${SALES_API_URL}/${id}`, sale);
export const deleteSale = (id) => axios.delete(`${SALES_API_URL}/${id}`);
