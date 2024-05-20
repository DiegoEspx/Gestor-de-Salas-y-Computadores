import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SalasPage } from './pages/SalasPage';
import { SalasFormPage } from './pages/SalasFormPage';
import { Navigation } from './components/Navigation';
import { SalaDetails } from './pages/SalaDetails';
import { ComputadorasPage } from './pages/ComputadorasPage';
import { ComputadoraFormPage } from './pages/ComputadorFormPage';
import './index.css';  //
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <main >
        <Navigation />
        <section>
          <section className=' bg-slate-400'>
            <Routes>
              {/* Url para mostrar las salas */}
              <Route path='/' element={<Navigate to="/salas" />} />
              <Route path='/salas' element={<SalasPage />} />
              {/* Url para crear la sala */}
              <Route path='/crear-sala' element={<SalasFormPage />} />
              {/* Url para editar datos de una sala */}
              <Route path='/editar-sala/:id' element={<SalasFormPage />} />
              {/* Detalle de una sala por id */}
              <Route path='/detalle-sala/:id' element={<SalaDetails />} />

              {/* --------------------------- Computadores -------------------------- */}
              {/* Url para mostrar Computadores */}
              <Route path='/computadores' element={<ComputadorasPage />} />
              {/* Url para crear computadores*/}
              <Route path='/crear-computador' element={<ComputadoraFormPage />} />

              

            </Routes>
            <Toaster/>
          </section>
        </section>
      </main>
    </BrowserRouter>
  )
}

export default App
