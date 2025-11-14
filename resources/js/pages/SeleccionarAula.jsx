import { useEffect, useState } from "react";

export default function SeleccionarAula(){
  const [aulas,setAulas] = useState([]);
  const [profes,setProfes] = useState([]);
  const [sel,setSel] = useState(null);

  useEffect(()=>{
    Promise.all([
      fetch('/api/aulas').then(r=>r.json()),
      fetch('/api/profesores').then(r=>r.json()),
    ]).then(([a, p]) => { setAulas(a); setProfes(p); });
  },[]);

  return (
    <div className="p-8">
      <div className="bg-[#0f0f2f] rounded-2xl p-6 text-white text-2xl font-bold mb-6">
        IoT en Aulas
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="mb-2 text-white">Lista de Aulas</div>
          <div className="rounded-xl overflow-hidden border border-gray-700">
            <table className="w-full text-white">
              <thead className="bg-black/40">
                <tr>
                  <th className="p-2">Selección</th><th className="p-2">Nombre</th><th className="p-2">Código</th><th className="p-2">Ubicación</th>
                </tr>
              </thead>
              <tbody>
              {aulas.map(a=>(
                <tr key={a.id} className="border-t border-gray-700">
                  <td className="p-2"><input type="radio" name="a" onChange={()=>setSel(a)} /></td>
                  <td className="p-2">{a.nombre}</td>
                  <td className="p-2">{a.codigo}</td>
                  <td className="p-2">{a.ubicacion}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="mb-2 text-white">Lista de Profesores</div>
          <div className="rounded-xl overflow-hidden border border-gray-700">
            <table className="w-full text-white">
              <thead className="bg-black/40">
                <tr><th className="p-2">Nombre Apellido</th><th className="p-2">Email</th></tr>
              </thead>
              <tbody>
                {profes.map(p=>(
                  <tr key={p.id} className="border-t border-gray-700">
                    <td className="p-2">{p.name}</td><td className="p-2">{p.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {sel && (
        <div className="mt-8 grid grid-cols-2 gap-6 text-white">
          <div className="bg-black/30 rounded-2xl h-64 flex items-center justify-center">Mapa del Aula</div>
          <div className="bg-black/30 rounded-2xl p-6">
            <div className="text-2xl font-bold mb-4">Resumen</div>
            <div className="grid grid-cols-2 gap-4">
              <div><div className="text-gray-300">Aula</div><div className="text-xl">{sel.nombre}</div></div>
              <div><div className="text-gray-300">Profesor</div><div className="text-xl">Juan Perez Leon</div></div>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="px-6 py-3 rounded-xl bg-slate-300 text-black">Acceder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
