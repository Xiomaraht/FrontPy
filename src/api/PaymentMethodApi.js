export async function obtenerMetodosPago(metodo) {
  try {
    const result = await fetch('http://localhost:8080/PaymentMethod',  {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify(metodo),

      });

      if(result.ok) {
        throw new Error("Error al guardar el metodo de pago");
      }
      return await result.json();
    } catch(error) {
      throw error;
    }
};


export const actualizarMetodoPago = async ( metodo) => {
  try {
    const result = await fetch('http://localhost:8080/PaymentMethod', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metodo),
    });

    if (!result.ok) {
      throw new Error("Error al actualizar el método de pago");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const eliminarMetodoPago = async () => {
  try {
    const response = await fetch('http://localhost:8080/PaymentMethod', {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el método de pago");
    }

    return true;
  } catch (error) {
    throw error;
  }
};