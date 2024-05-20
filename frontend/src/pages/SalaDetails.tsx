import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSala } from '../api/sala_api';
interface Computadora {
    numero: number;
    ocupado: boolean;
}

interface SalaDetailsProps {
    id: number; // Asegúrate de incluir el ID en la interfaz
    nombre: string;
    cantidad_computadoras: number;
    computadoras: Computadora[];
    ocupadas: number;
    libres: number;
}
export function SalaDetails() {
    const { id } = useParams<{ id: string }>();
    const [salaDetails, setSalaDetails] = useState<SalaDetailsProps | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchSalaDetails() {
            try {
                const res = await getSala(id!);
                setSalaDetails(res);
            } catch (error) {
                console.error("Error fetching sala details:", error);
            }
        }
        fetchSalaDetails();
    }, [id]);

    if (!salaDetails) {
        return <div>Loading...</div>;
    }

    const handleEdit = () => {
        navigate(`/editar-sala/${id}`);
    };

    return (
        <div>
            <h1>Detalles de la Sala</h1>
            <p><strong>ID:</strong> {salaDetails.id}</p> {/* Muestra el ID de la sala */}
            <p><strong>Nombre:</strong> {salaDetails.nombre}</p>
            <p><strong>Cantidad de Computadoras:</strong> {salaDetails.cantidad_computadoras}</p>
            <p><strong>Computadoras Ocupadas:</strong> {salaDetails.ocupadas}</p>
            <p><strong>Computadoras Libres:</strong> {salaDetails.libres}</p>
            <h2>Computadoras:</h2>
            <ul>
                {salaDetails.computadoras.map((comp, index) => (
                    <li key={index}>
                        Computadora {comp.numero}: {comp.ocupado ? 'Ocupada' : 'Libre'}
                    </li>
                ))}
            </ul>
            <button onClick={handleEdit}>Editar</button>
        </div>
    );
}
