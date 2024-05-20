import axios from 'axios';

const ComputadorApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/Salas/'
    
});

interface Computadora {
    id?: number;
    sala: number;
    nombre_sala: string;
    numero: number;
    ocupado: boolean;
}

export const getAllComputadoras = async (): Promise<Computadora[]> => {
    try {
        const response = await ComputadorApi.get('crear-computador/');
        return response.data;
    } catch (error) {
        console.error("Error fetching computadores:", error);
        throw error;
    }
};

// Función para crear una nueva computadora
export const createComputadora = async (computadora: Computadora) => {
    try {
        const response = await ComputadorApi.post('crear-computador/', computadora);
        return response.data;
    } catch (error) {
        console.error("Error al crear computadora:", error);
        throw error;
    }
};

// Función para eliminar una computadora
export const deleteComputadora = async (id: string): Promise<void> => {
    try {
        await ComputadorApi.delete(`eliminar-computadora/${id}`);
    } catch (error) {
        console.error("Error al eliminar computadora:", error);
        throw error;
    }
};

// Función para actualizar el estado de una computadora
export const updateComputadora = async (id: number, computadora: Partial<Computadora>) => {
    try {
        const response = await ComputadorApi.put(`estado-computadoras/${id}/`, computadora);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar computadora:", error);
        throw error;
    }
};
