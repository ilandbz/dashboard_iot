import { useEffect, useState } from "react";
import Modal from "../components/Modal";

export default function RegistroAula(){
  const [open,setOpen]=useState(false);
  const [aulas,setAulas]=useState([]);

  const load = ()=> fetch('/api/aulas').then(r=>r.json()).then(setAulas);
  useEffect(()=>{ load(); },[]);

  const submit = async (e)=>{
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.target).entries());
    const res = await fetch('/api/aulas', { // si deseas crear endpoint de store, si no, omítelo
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)
    }).catch(()=>({ok:false}));
    setOpen(false); load();
  };

  return (
    <div className="p-8">
      <div className="neon-header mb-6">Lista de Aulas</div>
      <div className="flex justify-end mb-4">
        <button className="btn btn-light" onClick={()=>setOpen(true)}>Registrar Aulas</button>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/10">
        <table className="w-full text-white">
          <thead className="bg-black/30">
            <tr>
              <th className="p-2">Nombre</th><th className="p-2">Código</th>
              <th className="p-2">Ubicación</th><th className="p-2">Nivel</th>
            </tr>
          </thead>
          <tbody>
            {aulas.map(a=>(
              <tr key={a.id} className="border-t border-white/10">
                <td className="p-2">{a.nombre}</td>
                <td className="p-2">{a.codigo}</td>
                <td className="p-2">{a.ubicacion}</td>
                <td className="p-2">{a.nivel} {a.grado} {a.seccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Aula">
        <form onSubmit={submit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">Nombre</label>
            <input name="nombre" className="input" required/>
          </div>
          <div>
            <label className="block mb-1">Plano</label>
            <input name="plano" className="input" placeholder="(opcional)"/>
          </div>
          <div>
            <label className="block mb-1">Ubicación</label>
            <input name="ubicacion" className="input"/>
          </div>
          <div>
            <label className="block mb-1">Tipo</label>
            <input name="tipo" className="input" placeholder="Laboratorio/Regular"/>
          </div>
          <div>
            <label className="block mb-1">Código</label>
            <input name="codigo" className="input" required/>
          </div>
          <div className="flex items-end">
            <button className="btn btn-dark">Registrar Datos</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
