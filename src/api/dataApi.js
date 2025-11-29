import { fetchWithAuth } from './fetchWithAuth';

export const getSpeciesApi = async () => {
    try {
        const respuesta = await fetchWithAuth('/data/species');
        if (!respuesta.ok) {
            throw new Error("Error al obtener las especies");
        }
        return await respuesta.json(); // Retorna List<SpecieDTO>
    } catch (error) {
        // ... manejo de errores
        throw error;
    }
};

// Obtiene razas filtradas por especie
export const getRacesBySpecieIdApi = async (specieId) => {
    try {
        const respuesta = await fetchWithAuth(`/data/races/species/${specieId}`);
        if (!respuesta.ok) {
            throw new Error("Error al obtener las razas");
        }
        return await respuesta.json(); // Retorna List<RaceDTO>
    } catch (error) {
        // ... manejo de errores
        throw error;
    }
};