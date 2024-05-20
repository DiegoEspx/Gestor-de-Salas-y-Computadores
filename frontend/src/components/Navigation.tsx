import {Link} from 'react-router-dom';                  

export function Navigation() {
    return (
    <div className='flex '>
        <Link to="/salas">
            <h1> Gestion Salas Computadores</h1>
        </Link>
        
        <Link to= '/crear-sala' > Crear Sala </Link>
        
        <Link to= '/computadores'>Computadoras </Link>

        <Link to= '/crear-computador'> Crear Computador </Link>
    </div>
    )
}

