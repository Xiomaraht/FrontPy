import axios from 'axios';

const API_URL = 'http://localhost:8080/api/medical-records';

export const createMedicalRecordApi = async (recordData) => {
    const response = await axios.post(API_URL, recordData);
    return response.data;
};

export const getMedicalRecordsByPetIdApi = async (petId) => {
    const response = await axios.get(`${API_URL}/pet/${petId}`);
    return response.data;
};

export const getMedicalRecordsByClinicIdApi = async (clinicId) => {
    const response = await axios.get(`${API_URL}/clinic/${clinicId}`);
    return response.data;
};

export const deleteMedicalRecordApi = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
