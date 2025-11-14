import { useEffect, useState } from "react";
import CameraCapture from "../components/CameraCapture";
import Modal from "../components/Modal";

export default function RegistroUsuario(){
  const [aulas,setAulas]=useState([]); const [profes,setProfes]=useState([]);
  const [foto,setFoto]=useState(null);
  const [open,setOpen]=useState(true); // lo abrimos como modal estilo tu mock

  useEffect(()=>{
    fetch('/api/aulas').then(r=>r.json()).then(setAulas);
    fetch('/api/profesores').then(r=>r.json()).then(setProfes);
  },[]);

  const submit = async (e)=>{
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.target).entries());
    form.foto_base64 = foto;
    const res = await fetch('/api/estudiantes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    alert((await res.json()).mensaje ?? 'Registrado');
  };

  return (
    <div className="p-8">
      <div className="neon-header mb-6">Lista de usuarios</div>

      <Modal open={open} onClose={()=>setOpen(false)} title="Estudiantes"
        footer={<div className="flex justify-end"><button form="formEst" className="btn btn-dark">Registrar Datos</button></div>}>
        <form id="formEst" onSubmit={submit} className="grid grid-cols-12 gap-5">
          <div className="col-span-4">
            <div className="text-white text-xl font-bold mb-3">Estudiante</div>
            <div className="space-y-3">
              <input name="nombre" className="input" placeholder="Nombre" required/>
              <input name="apellido" className="input" placeholder="Apellido" required/>
              <input name="dni" className="input" placeholder="DNI" required/>
            </div>
          </div>

          <div className="col-span-4">
            <div className="text-white text-xl font-bold mb-3">Asignar nivel</div>
            <div className="grid grid-cols-2 gap-3">
              <select name="nivel" className="input">
                <option>Inicial</option><option>Primaria</option><option>Secundaria</option>
              </select>
              <select name="genero" className="input">
                <option value="">Género</option><option>M</option><option>F</option><option>O</option>
              </select>
              <input name="grado" className="input" placeholder="Grado"/>
              <input name="seccion" className="input" placeholder="Sección"/>
              <select name="rol" className="input"><option>estudiante</option><option>delegado</option></select>
            </div>

            <div className="mt-4">
              <div className="text-white font-bold mb-2">Asignar aula</div>
              <select name="aula_id" className="input">
                <option value="">(elige aula)</option>
                {aulas.map(a=><option key={a.id} value={a.id}>{a.nombre}</option>)}
              </select>
            </div>

            <div className="mt-4">
              <div className="text-white font-bold mb-2">Asignar docente</div>
              <select name="profesor_id" className="input">
                <option value="">(elige profesor)</option>
                {profes.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>

          <div className="col-span-4">
            <div className="text-white text-xl font-bold mb-3">Captura</div>
            <CameraCapture onCapture={setFoto}/>
            <div className="mt-3 rounded-2xl border-2 border-blue-400 h-56 flex items-center justify-center bg-[#0b0b28]">
              {foto ? <img src={foto} alt="captura" className="max-h-56 rounded-xl"/> : <span className="text-gray-400">Vista previa</span>}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
