import api from "../api/axios";

export const crearMetodoPago = async (metodo) => {
  try {
    const response = await api.post("/PaymentMethod", metodo);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Error al guardar el método de pago"
    );
  }
};

export const actualizarMetodoPago = async (metodo) => {
  try {
    const response = await api.put("/PaymentMethod", metodo);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Error al actualizar el método de pago"
    );
  }
};

export const eliminarMetodoPago = async (id) => {
  try {
    await api.delete(`/PaymentMethod/${id}`);
    return true;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Error al eliminar el método de pago"
    );
  }
};