import axios from "axios";

const RECORD_API_URL = "http://localhost:8080/api/milk-records";

export const getAllRecords = () => axios.get(RECORD_API_URL);
export const addRecord = (record) => axios.post(RECORD_API_URL, record);
export const getRecordById = (id) => axios.get(`${RECORD_API_URL}/${id}`);
export const updateRecord = (id, record) => axios.put(`${RECORD_API_URL}/${id}`, record);
export const deleteRecord = (id) => axios.delete(`${RECORD_API_URL}/${id}`);
