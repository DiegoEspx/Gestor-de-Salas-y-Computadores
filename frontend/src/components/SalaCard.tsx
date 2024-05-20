import { useNavigate } from "react-router-dom";

interface SalaCardProps {
    sala: {
        id: number;
        nombre: string;
        cantidad_computadoras: number;
    };
}

export function SalaCard({ sala }: SalaCardProps) {
    const navigate = useNavigate();
    return (
        <div 
            className="bg-orange-800 p-4 rounded-lg shadow-md cursor-pointer hover:bg-orange-700"
            style={{ background: '#' }}
            onClick={() => {
                navigate('/detalle-sala/' + sala.id);
            }}
        >
            <h1>Sala: {sala.nombre}</h1>
            <p>Computadores: {sala.cantidad_computadoras}</p>  
            <hr />
        </div>
    );
}
