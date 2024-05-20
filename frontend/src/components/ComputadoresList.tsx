import { useEffect, useState } from "react";
import { getAllComputadoras } from "../api/computador_api";
import { ComputadoraCard } from './ComputadorCard';

interface Computadora {
    id?: number;
    sala: number;  // Mantén esto como número para la referencia
    nombre_sala: string; // Añadir este campo para el nombre de la sala
    numero: number;
    ocupado: boolean;
}

export function ComputadorList() {
    const [computadores, setComputadores] = useState<Computadora[]>([]);

    useEffect(() => {
        async function loadComputadoras() {
            try {
                const res = await getAllComputadoras();
                setComputadores(res);
            } catch (error) {
                console.error("Error fetching computadores:", error);
            }
        }
        loadComputadoras();
    }, []);
    
    return (
        <div>
            {computadores.map((computador) => (
                <ComputadoraCard key={computador.id} computador={computador} />
            ))}
        </div>
        
    );
}
