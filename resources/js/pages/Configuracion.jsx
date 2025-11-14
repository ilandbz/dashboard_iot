import { useState } from "react";

const getCsrf = () => document.querySelector('meta[name="csrf-token"]')?.content || "";

export default function Configuracion() {
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState({ codigo:"", ubicacion:"", descripcion:"", tipo:"" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setMsg("");
    try {
      const res = await fetch("/api/dispositivos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCsrf(),
          "Accept": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error al registrar");
      setMsg("✅ Dispositivo registrado");
      setForm({ codigo:"", ubicacion:"", descripcion:"", tipo:"" });
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
        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl"
      >
        Registrar Dispositivos
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={()=>setOpen(false)} />
          <div className="relative w-[680px] rounded-2xl bg-[#2616ff] shadow-2xl p-0">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
              <h2 className="text-2xl font-extrabold">Registrar Dispositivos</h2>
              <button onClick={()=>setOpen(false)} className="underline">Cancelar</button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
              <div>
                <label className="block font-semibold mb-1">Código</label>
                <input name="codigo" value={form.codigo} onChange={onChange}
                  className="w-full rounded-xl px-3 py-2 text-black" required />
              </div>

              <div>
                <label className="block font-semibold mb-1">Ubicación</label>
                <input name="ubicacion" value={form.ubicacion} onChange={onChange}
                  className="w-full rounded-xl px-3 py-2 text-black" required />
              </div>

              <div>
                <label className="block font-semibold mb-1">Descripción</label>
                <input name="descripcion" value={form.descripcion} onChange={onChange}
                  className="w-full rounded-xl px-3 py-2 text-black" />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tipo</label>
                <input name="tipo" value={form.tipo} onChange={onChange}
                  className="w-full rounded-xl px-3 py-2 text-black" placeholder="Temperatura, Humedad, etc." required />
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
