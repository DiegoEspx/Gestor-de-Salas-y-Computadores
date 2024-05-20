import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createSala, deleteSala, updateSala, getSala } from '../api/sala_api';
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface FormData {
    nombreSala: string;
}

export function SalasFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadSala() {
            if (params.id) {
                try {
                    const res = await getSala(params.id!);
                    if (res && res.nombre) {
                        setValue('nombreSala', res.nombre);
                    } else {
                        console.error("La respuesta de la API no tiene la estructura esperada:", res);
                    }
                } catch (error) {
                    console.error("Error loading sala:", error);
                }
            }
        }
        loadSala();
    }, [params.id, setValue]);

    const onSubmit = handleSubmit(async (data: FormData) => {
        const sala = {
            nombre: data.nombreSala,
        };
        try {
            if (params.id) {
                await updateSala(params.id, sala);
            } else {
                await createSala(sala);
                toast.success("Sala Creada", {
                    position: 'bottom-center'
                })
            }
            navigate("/salas");
        } catch (error) {
            console.error("Error al crear o actualizar la sala:", error);
        }
    });

    return (
        <div>
            <main>
                <form onSubmit={onSubmit}>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Nombre Sala"
                            autoComplete="off"
                            {...register("nombreSala", { required: "El nombre de la sala es obligatorio" })}
                        />
                        {errors.nombreSala && <span>Este campo es requerido</span>}
                    </div>
                    <button type="submit">Guardar</button>
                </form>
                {params.id && (
                    <button onClick={async() => {
                        const aceptar = window.confirm('¿Estás seguro?');
                        if (aceptar) {
                            try {
                                await deleteSala(params.id!);
                                navigate('/salas');
                            } catch (error) {
                                console.error("Error al eliminar la sala:", error);
                            }
                        }
                    }}>Eliminar</button>
                )}
            </main>
        </div>
    );
}
