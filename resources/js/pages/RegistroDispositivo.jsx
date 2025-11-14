import { useEffect, useState } from "react";
import Modal from "../components/Modal";

export default function RegistroDispositivo() {
  const [open, setOpen]         = useState(false);
  const [aulas, setAulas]       = useState([]);
  const [rows, setRows]         = useState([]);

  const [loadingAulas, setLoadingAulas]   = useState(false);
  const [loadingDisp, setLoadingDisp]     = useState(false);
  const [errorAulas, setErrorAulas]       = useState("");
  const [errorDisp, setErrorDisp]         = useState("");

  const load = async () => {

fetch('/api/aulas')
  .then(async r => {
    const text = await r.text();
    console.log("RAW RESPONSE:", text);   // 👈 importante
    try {
      const data = JSON.parse(text);
      setAulas(data);
    } catch (e) {
      console.error("NO ES JSON:", e);
    }
  });


    // limpiamos errores previos
    setErrorAulas("");
    setErrorDisp("");

    // 🔹 cargar aulas
    setLoadingAulas(true);
    try {
      const res = await fetch("/api/aulas");
      if (!res.ok) throw new Error(`Error aulas: ${res.status}`);
      const data = await res.json();
      console.log("✅ Aulas cargadas:", data.length, data); // 👈 seguimiento
      setAulas(data);
    } catch (e) {
      console.error(e);
      setErrorAulas(e.message);
    } finally {
      setLoadingAulas(false);
    }

    // 🔹 cargar dispositivos
    setLoadingDisp(true);
    try {
      const res = await fetch("/api/dispositivos");
      if (!res.ok) throw new Error(`Error dispositivos: ${res.status}`);
      const data = await res.json();
      console.log("✅ Dispositivos cargados:", data.length, data);
      setRows(data);
    } catch (e) {
      console.error(e);
      setErrorDisp(e.message);
    } finally {
      setLoadingDisp(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.target).entries());

    const res = await fetch("/api/dispositivos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setOpen(false);
      load(); // recargar tabla y ver en logs que vuelve a traer data
    }
  };

  return (
    <div className="p-8">
      <div className="neon-header mb-6">Registrar Dispositivos</div>

      {/* mensajes de seguimiento en UI */}
      {loadingAulas && (
        <div className="mb-2 text-sm text-white/80">
          Cargando aulas...
        </div>
      )}
      {errorAulas && (
        <div className="mb-2 text-sm text-red-400">
          Error al cargar aulas: {errorAulas}
        </div>
      )}

      <div className="flex justify-end mb-4">
        <button className="btn btn-light" onClick={() => setOpen(true)}>
          Nuevo dispositivo
        </button>
      </div>

      {errorDisp && (
        <div className="mb-2 text-sm text-red-400">
          Error al cargar dispositivos: {errorDisp}
        </div>
      )}

      <div className="rounded-2xl overflow-hidden border border-white/10">
        <table className="w-full text-white">
          <thead className="bg-black/30">
            <tr>
              <th className="p-2">Código</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Ubicación</th>
              <th className="p-2">Aula</th>
              <th className="p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {loadingDisp ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-white/70">
                  Cargando dispositivos...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-white/70">
                  No hay dispositivos registrados
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-t border-white/10">
                  <td className="p-2">{r.codigo}</td>
                  <td className="p-2">{r.tipo}</td>
                  <td className="p-2">{r.ubicacion}</td>
                  <td className="p-2">{r.aula?.nombre}</td>
                  <td className="p-2">
                    {r.estado ? "encendido" : "apagado"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Dispositivos"
        footer={
          <div className="flex justify-center">
            <button form="formDispositivo" className="btn btn-dark">
              Registrar Datos
            </button>
          </div>
        }
      >
        <form
          id="formDispositivo"
          onSubmit={submit}
          className="grid grid-cols-1 gap-4"
        >
          <div>
            <label className="block mb-1">Código</label>
            <input name="codigo" className="input" required />
          </div>
          <div>
            <label className="block mb-1">Ubicación</label>
            <input
              name="ubicacion"
              className="input"
              placeholder="puerta-01 / pizarra"
            />
          </div>
          <div>
            <label className="block mb-1">Descripción</label>
            <input name="descripcion" className="input" />
          </div>
          <div>
            <label className="block mb-1">Tipo</label>
            <select name="tipo" className="input" required>
              <option>Temperatura</option>
              <option>Humedad</option>
              <option>Presencia</option>
              <option>Actuador</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Aula</label>
            <select name="aula_id" className="input">
              <option value="">(sin aula)</option>
              {aulas.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
