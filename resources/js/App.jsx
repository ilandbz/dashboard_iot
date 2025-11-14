import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Inicio from "./pages/Inicio";
import SeleccionarAula from "./pages/SeleccionarAula";
import EncenderDispositivo from "./pages/EncenderDispositivo";
import Temperatura from "./pages/Temperatura";
import Humedad from "./pages/Humedad";            // 👈 nuevo
import RegistroUsuario from "./pages/RegistroUsuario";
import RegistroDispositivo from "./pages/RegistroDispositivo";
import RegistroAula from "./pages/RegistroAula";
import Analisis from "./pages/Analisis";
import Landing from "./pages/Landing";
import Configuracion from "./pages/Configuracion";
export default function App(){
  const [route, setRoute] = useState('inicio');

  const render = () => {
    switch(route){
      case 'seleccionar-aula': return <SeleccionarAula/>;
      case 'encender-dispositivo': return <EncenderDispositivo/>;
      case 'temperatura': return <Temperatura/>;
      case 'humedad': return <Humedad/>;
      case "analisis":    return <Analisis />;
      case 'registro-usuario': return <RegistroUsuario/>;
      case 'registro-dispositivo': return <RegistroDispositivo/>;
      case 'registro-aula': return <RegistroAula/>;
      case 'landing': return <Landing/>;
      case 'configuracion': return <Configuracion />;
      default: return <Inicio onNavigate={setRoute}/>;
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar current={route} onNavigate={setRoute}/>
      <main className="flex-1">{render()}</main>
    </div>
  );
}