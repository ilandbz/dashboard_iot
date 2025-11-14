import { doLogout } from "@/utils/auth";


export default function Sidebar({ current, onNavigate }) {
  const items = [
    { key:'seleccionar-aula', label:'Seleccionar aula' },
    { key:'encender-dispositivo', label:'Encender dispositivo' },
    { key:'inicio', label:'Inicio' },
    { key:'temperatura', label:'Temperatura' },
    { key:'analisis', label:'Análisis automático' },
    { key:'landing', label:'Ver Video' },

  ];

  return (
    <aside className="w-64 bg-[#0b0b28] text-white flex flex-col justify-between">
      <div>
        <div className="p-6">
          <h1 className="text-2xl font-extrabold leading-tight">
            Dashboard IoT<br/>Yusmer Llan
          </h1>
        </div>
        <nav className="px-4 space-y-2">
          {items.map(it => (
            <button
              key={it.key}
              className={`w-full text-left px-4 py-3 rounded-lg ${current===it.key ? 'bg-gray-400 text-black' : 'hover:bg-white/10'}`}
              onClick={() => onNavigate(it.key)}
            >
              {it.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="px-4 py-6 space-y-2">
        <button
        key={'configuracion'}
        onClick={() => onNavigate('configuracion')}
        className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10">
          Configuración
        </button>
        <button
        onClick={doLogout}
        className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
