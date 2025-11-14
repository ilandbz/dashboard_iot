import { useEffect, useState } from "react";
import Modal from "../components/Modal";

export default function RegistroDispositivo(){
  const [open,setOpen]=useState(false);
  const [aulas,setAulas]=useState([]);
  const [rows,setRows]=useState([]);

  const load = ()=>{
    fetch('/api/aulas').then(r=>r.json()).then(setAulas);
    fetch('/api/dispositivos').then(r=>r.json()).then(setRows);
  };
  useEffect(()=>{ load(); },[]);

  const submit = async (e)=>{
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.target).entries());
    const res = await fetch('/api/dispositivos', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)
    });
    if(res.ok) { setOpen(false); load(); }
  };

  return (
    <div className="p-8">
      <div className="neon-header mb-6">Registrar Dispositivos</div>

      <div className="flex justify-end mb-4">
        <button className="btn btn-light" onClick={()=>setOpen(true)}>Nuevo dispositivo</button>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/10">
        <table className="w-full text-white">
          <thead className="bg-black/30">
            <tr>
              <th className="p-2">Código</th><th className="p-2">Tipo</th>
              <th className="p-2">Ubicación</th><th className="p-2">Aula</th><th className="p-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id} className="border-t border-white/10">
                <td className="p-2">{r.codigo}</td>
                <td className="p-2">{r.tipo}</td>
                <td className="p-2">{r.ubicacion}</td>
                <td className="p-2">{r.aula?.nombre}</td>
                <td className="p-2">{r.estado ? 'encendido':'apagado'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Dispositivos"
        footer={<div className="flex justify-center">
          <button form="formDispositivo" className="btn btn-dark">Registrar Datos</button>
        </div>}>
        <form id="formDispositivo" onSubmit={submit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1">Código</label>
            <input name="codigo" className="input" required/>
          </div>
          <div>
            <label className="block mb-1">Ubicación</label>
            <input name="ubicacion" className="input" placeholder="puerta-01 / pizarra"/>
          </div>
          <div>
            <label className="block mb-1">Descripción</label>
            <input name="descripcion" className="input"/>
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
              {aulas.map(a=><option key={a.id} value={a.id}>{a.nombre}</option>)}
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
