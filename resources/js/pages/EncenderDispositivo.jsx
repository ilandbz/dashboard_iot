import { useEffect, useState } from "react";

export default function EncenderDispositivo() {
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    fetch('/api/dispositivos/by-aula/1')
      .then(r=>r.json()).then(setRows);
  },[]);

  const toggle = async (id) => {
    const res = await fetch(`/api/dispositivos/${id}/toggle`, {method:'POST'});
    const js = await res.json();
    setRows(rows.map(r=>r.id===id?{...r, estado: js.estado}:r));
  };

  return (
    <div className="p-8">
      <div className="bg-[#0f0f2f] rounded-2xl p-6 text-white text-2xl font-bold mb-6">
        Bienvenido Juan Perez
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-700">
        <table className="w-full text-white">
          <thead className="bg-[#3a3a3a]">
            <tr>
              <th className="p-3 text-left">Dispositivo/Código</th>
              <th className="p-3 text-left">Ubicación</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id} className="border-t border-gray-700">
                <td className="p-3">{r.codigo}</td>
                <td className="p-3">{r.ubicacion}</td>
                <td className="p-3">{r.estado ? 'encendido' : 'apagado'}</td>
                <td className="p-3">
                  <button onClick={()=>toggle(r.id)}
                    className="px-3 py-2 rounded-lg bg-slate-300 text-black hover:bg-slate-200">
                    {r.estado?'Apagar':'Encender'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="px-6 py-3 rounded-xl bg-slate-300">Acceder</button>
      </div>
    </div>
  );
}
