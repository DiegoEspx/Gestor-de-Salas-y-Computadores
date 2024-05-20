import axios from 'axios';

//Aqui se añaden las funciones, ej: crear, eliminar, actualizar etc, funciones

const salasApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/Salas/'
});

interface Sala {
    id?: number;  
    nombre: string;
    cantidad_computadoras?: number;
}

// Función para obtener todas las salas
export const getAllSalas = async () => {
    try {
        const response = await salasApi.get('crear-sala/');
        return response.data;  // Devuelve solo los datos
    } catch (error) {
        console.error("Error al salas:", error);
        throw error;
    }
};

// Funcion para obtener los datos de una sala

export const getSala= async (id: string) => {
    try {
        const response = await salasApi.get('detalle-sala/' + id);
        return response.data;  // Devuelve solo los datos
    } catch (error) {
        console.error("Error al obtener datos de una sala:", error);
        throw error;
    }
};


// Función para crear una nueva sala
export const createSala = async (sala: Sala) => {
    try {
        const response = await salasApi.post('crear-sala/', sala);
        return response.data;  // Devuelve solo los datos
    } catch (error) {
        console.error("Error al crear sala:", error);
        throw error;
    }
};

export const deleteSala = async (id: string) => {
    try {
        return await salasApi.delete(`eliminar-sala/` + id);
    } catch (error) {
        console.error("Error deleting sala:", error);
        throw error;
    }
};

export const updateSala = async (id: string, sala: Sala) => {
    try {
        return await salasApi.put(`actualizar-sala/${id}/`, sala);
    } catch (error) {
        console.error("Error actualizar sala:", error);
        throw error;
    }
};