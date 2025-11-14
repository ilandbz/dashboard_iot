import { useMemo, useState } from "react";

// Paleta local para cajas moradas y encabezados
const card = "bg-[#2b2450] rounded-2xl";
const soft = "bg-[#443a74] rounded-2xl";

// Datos mock (puedes reemplazar por tu API)
const RAW = [
  { alumno: "Valeria Flores",  pred: "Presente", gesto: "Cabeza inclinada",  expresion: "Somnolencia", nivel: "Alta",  fecha: "10/02/2025", curso: "Matemática" },
  { alumno: "Diego Paredes",   pred: "Presente", gesto: "Cabeza inclinada",  expresion: "Somnolencia", nivel: "Alta",  fecha: "10/02/2025", curso: "Matemática" },
  { alumno: "Lucía Mendoza",   pred: "Presente", gesto: "Cabeza inclinada",  expresion: "Somnolencia", nivel: "Alta",  fecha: "10/02/2025", curso: "Matemática" },
];

export default function Analisis() {
  const [criticidad, setCriticidad] = useState("Alta");
  const [curso, setCurso] = useState("Matemática");
  const [nAlumnos, setNAlumnos] = useState(22);

  const rows = useMemo(
    () => RAW.filter(r => r.curso === curso && r.nivel === criticidad),
    [curso, criticidad]
  );

  return (
    <div className="p-8 text-white">
      <div className={`${card} p-6 text-3xl font-extrabold mb-6`}>
        Análisis en el Aula Tigresito Primaria 1 A
      </div>

      {/* Filtros / KPIs */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className={`${soft} p-4`}>
          <div className="text-sm opacity-80 mb-1">Nivel de criticidad</div>
          <div className="flex items-center gap-3">
            <select
              value={criticidad}
              onChange={e => setCriticidad(e.target.value)}
              className="w-full bg-black/20 rounded-lg px-3 py-2 outline-none"
            >
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
            <button className="px-3 py-2 rounded-lg bg-black/20">⚙️</button>
          </div>
        </div>

        <div className={`${soft} p-4`}>
          <div className="text-sm opacity-80 mb-1">N° alumnos</div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-2 rounded-lg bg-black/20 w-24 text-center font-bold">
              {nAlumnos}
            </div>
            <input
              type="range"
              min={10}
              max={40}
              value={nAlumnos}
              onChange={e => setNAlumnos(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className={`${soft} p-4`}>
          <div className="text-sm opacity-80 mb-1">Curso</div>
          <select
            value={curso}
            onChange={e => setCurso(e.target.value)}
            className="w-full bg-black/20 rounded-lg px-3 py-2 outline-none"
          >
            <option>Matemática</option>
            <option>Comunicación</option>
            <option>Historia</option>
            <option>Ciencia y Ambiente</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className={`${card} p-0 overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-sm">
              <tr>
                <th className="px-5 py-3">Alumno</th>
                <th className="px-5 py-3">Tipo de predicción</th>
                <th className="px-5 py-3">Gesto</th>
                <th className="px-5 py-3">Expresión facial</th>
                <th className="px-5 py-3">Nivel</th>
                <th className="px-5 py-3">Fecha</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-white/5">
                  <td className="px-5 py-4">{r.alumno}</td>
                  <td className="px-5 py-4">{r.pred}</td>
                  <td className="px-5 py-4">{r.gesto}</td>
                  <td className="px-5 py-4">{r.expresion}</td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-1 rounded-md text-xs bg-red-500/30 border border-red-400/40">
                      {r.nivel}
                    </span>
                  </td>
                  <td className="px-5 py-4">{r.fecha}</td>
                  <td className="px-5 py-4 text-right">⋮</td>
                </tr>
              ))}

              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center opacity-70">
                    Sin registros para los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
