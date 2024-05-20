import { useForm } from "react-hook-form";
import { createComputadora } from '../api/computador_api';
import { useNavigate } from "react-router-dom";

interface FormData {
    sala: number;
    nombre_sala: string; 
    numero: number;
    ocupado: boolean;
}

export function ComputadoraFormPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const navigate = useNavigate();
    
    const onSubmit = handleSubmit(async (data: FormData) => {
        try {
            await createComputadora(data);
            navigate("/computadores");
        } catch (error) {
            console.error("Error al crear la computadora:", error);
        }
    });

    return (
        <div>
            <main>
                <form onSubmit={onSubmit}>
                    <div>
                        <input 
                            type="number" 
                            placeholder="ID de la Sala"
                            {...register("sala", { required: "El ID de la sala es obligatorio" })}
                        />
                        {errors.sala && <span>Este campo es requerido</span>}
                    </div>
                    <div>
                        <input 
                            type="number" 
                            placeholder="Número de Computadora"
                            {...register("numero", { required: "El número de la computadora es obligatorio" })}
                        />
                        {errors.numero && <span>Este campo es requerido</span>}
                    </div>
                    <div>
                        <label>
                            <input 
                                type="checkbox" 
                                {...register("ocupado")}
                            />
                            Ocupado
                        </label>
                    </div>
                    <button type="submit">Guardar</button>
                </form>
            </main>
        </div>
    );
}
