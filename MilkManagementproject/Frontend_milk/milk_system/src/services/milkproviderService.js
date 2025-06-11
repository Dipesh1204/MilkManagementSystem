import axios from "axios";

const PROVIDER_API_URL = "http://localhost:8080/api/providers";

export const getAllProviders = () => axios.get(PROVIDER_API_URL);
export const addProvider = (provider) => axios.post(PROVIDER_API_URL, provider);
export const getProviderById = (id) => axios.get(`${PROVIDER_API_URL}/${id}`);
export const updateProvider = (id, provider) => axios.put(`${PROVIDER_API_URL}/${id}`, provider);
export const deleteProvider = (id) => axios.delete(`${PROVIDER_API_URL}/${id}`);