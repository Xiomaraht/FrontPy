import { message } from 'antd';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dnzom8pgh/image/upload';
const UPLOAD_PRESET = 'ml_default'; // Debe ser un preset SIN FIRMAR

/**
 * Función para subir un archivo de imagen al servicio de Cloudinary.
 * @param {File} imageFile - El objeto File de la imagen a subir.
 * @returns {Promise<string>} La URL segura (secure_url) de la imagen subida.
 */

export const uploadImageToCloudinary = async (imageFile) => {
    
    if (!imageFile) {
        return '';
    }

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Error desconocido al subir la imagen.');
        }

        const data = await response.json();
        return data.secure_url; // Retorna la URL segura
    } catch (error) {
        console.error("Error en la subida a Cloudinary:", error);
        // Mostrar un mensaje de error al usuario
        message.error(`Fallo al subir la imagen: ${error.message}`);
        throw error; // Propagar el error
    }
};