import axios from "axios";

const RATE_API_URL = "http://localhost:8080/api/milk-rates";

export const getAllRates = () => axios.get(RATE_API_URL);
export const addRate = (rate) => axios.post(RATE_API_URL, rate);
export const getRateById = (id) => axios.get(`${RATE_API_URL}/${id}`);
export const updateRate = (id, rate) => axios.put(`${RATE_API_URL}/${id}`, rate);
export const deleteRate = (id) => axios.delete(`${RATE_API_URL}/${id}`);
