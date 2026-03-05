// dataApi.js
import api from "../api/axios";

export const getSpeciesApi = async () => {
  try {
    const response = await api.get("/data/species");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Error al obtener las especies"
    );
  }
};

export const getRacesBySpecieIdApi = async (specieId) => {
  try {
    const response = await api.get(`/data/races/species/${specieId}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Error al obtener las razas"
    );
  }
};