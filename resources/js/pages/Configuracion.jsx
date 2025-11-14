import { useState, useEffect } from "react";

const getCsrf = () =>
  document.querySelector('meta[name="csrf-token"]')?.content || "";

export default function Configuracion() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    codigo: "",
    ubicacion: "",
    descripcion: "",
    tipo: "",
    aula_id: "",
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const [aulas, setAulas] = useState([]);
  const [rows, setRows] = useState([]);

  const [loadingAulas, setLoadingAulas] = useState(false);
  const [loadingDisp, setLoadingDisp] = useState(false);
  const [errorAulas, setErrorAulas] = useState("");
  const [errorDisp, setErrorDisp] = useState("");

  const loadAll = async () => {
    setErrorAulas("");
    setErrorDisp("");

    // 🔹 AULAS
    setLoadingAulas(true);
    try {
      const res = await fetch("/api/aulas", { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`Error aulas: ${res.status}`);
      const data = await res.json();
      setAulas(data);
    } catch (e) {
      console.error(e);
      setErrorAulas(e.message);
    } finally {
      setLoadingAulas(false);
    }

    // 🔹 DISPOSITIVOS
    setLoadingDisp(true);
    try {
      const res = await fetch("/api/dispositivos", { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`Error dispositivos: ${res.status}`);
      const data = await res.json();
      setRows(data);
    } catch (e) {
      console.error(e);
      setErrorDisp(e.message);
    } finally {
      setLoadingDisp(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");

    try {
      const res = await fetch("/api/dispositivos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCsrf(),
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error al registrar");

      setMsg("✅ Dispositivo registrado");
      setForm({
        codigo: "",
        ubicacion: "",
        descripcion: "",
        tipo: "",
        aula_id: "",
      });

      // recargar lista
      await loadAll();
      setOpen(false);
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 text-white">
      <div className="neon-header mb-6">Configuración</div>

      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl mb-6"
      >
        Registrar Dispositivos
      </button>

      {/* tabla de dispositivos */}
      {errorDisp && (
        <div className="mb-2 text-sm text-red-300">
          Error al cargar dispositivos: {errorDisp}
        </div>
      )}

      <div className="rounded-2xl overflow-hidden border border-white/10">
        <table className="w-full text-white">
          <thead className="bg-black/30">
            <tr>
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Tipo</th>
              <th className="p-2 text-left">Ubicación</th>
              <th className="p-2 text-left">Aula</th>
              <th className="p-2 text-left">Estado</th>
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

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-[680px] rounded-2xl bg-[#2616ff] shadow-2xl p-0">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
              <h2 className="text-2xl font-extrabold">
                Registrar Dispositivos
              </h2>
              <button onClick={() => setOpen(false)} className="underline">
                Cancelar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
              <div>
                <label className="block font-semibold mb-1">Código</label>
                <input
                  name="codigo"
                  value={form.codigo}
                  onChange={onChange}
                  className="w-full rounded-xl px-3 py-2 text-black"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Ubicación</label>
                <input
                  name="ubicacion"
                  value={form.ubicacion}
                  onChange={onChange}
                  className="w-full rounded-xl px-3 py-2 text-black"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Descripción</label>
                <input
                  name="descripcion"
                  value={form.descripcion}
                  onChange={onChange}
                  className="w-full rounded-xl px-3 py-2 text-black"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tipo</label>
                <input
                  name="tipo"
                  value={form.tipo}
                  onChange={onChange}
                  className="w-full rounded-xl px-3 py-2 text-black"
                  placeholder="Temperatura, Humedad, etc."
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Aula</label>
                {loadingAulas ? (
                  <div className="text-sm">Cargando aulas...</div>
                ) : errorAulas ? (
                  <div className="text-sm text-red-200">
                    Error al cargar aulas: {errorAulas}
                  </div>
                ) : (
                  <select
                    name="aula_id"
                    value={form.aula_id}
                    onChange={onChange}
                    className="w-full rounded-xl px-3 py-2 text-black"
                  >
                    <option value="">(sin aula)</option>
                    {aulas.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.nombre}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {msg && <div className="text-sm">{msg}</div>}

              <div className="pt-2">
                <button
                  disabled={saving}
                  className="w-full bg-black hover:bg-neutral-900 rounded-xl py-3 font-semibold disabled:opacity-60"
                >
                  {saving ? "Guardando..." : "Registrar Datos"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
