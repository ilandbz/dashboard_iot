export default function Landing(){
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <div className="p-16 flex flex-col justify-center">
        <h2 className="text-5xl font-extrabold mb-6">El futuro está en tus manos</h2>
        <p className="text-lg text-white/85 mb-10">
          Conecta con la educación del mañana mediante nuestra plataforma IoT avanzada que
          transforma la experiencia de aprendizaje.
        </p>

        <div className="space-y-6">
          <div>
            <div className="font-bold">Monitoreo en Tiempo Real</div>
            <div className="text-white/80">Sigue el progreso de estudiantes y dispositivos IoT al instante</div>
          </div>
          <div>
            <div className="font-bold">Gestión de Clases</div>
            <div className="text-white/80">Administra múltiples aulas y grupos de estudiantes eficientemente</div>
          </div>
          <div>
            <div className="font-bold">Analíticos Avanzados</div>
            <div className="text-white/80">Obtén insights detallados sobre temperatura del aula y estudiante</div>
          </div>
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-[#6b5cff33] border border-[#6b5cff55] text-white/90">
          “La tecnología es sólo una herramienta. Para conseguir que los niños trabajen juntos y motivarles,
          el profesor es lo más importante.” — Bill Gates
        </div>
      </div>

      <div className="flex items-center justify-center p-10">
        <div className="neon-panel max-w-md w-full">
          <div className="text-center text-4xl font-extrabold mb-2">LOGIN</div>
          <div className="text-center text-white/80 mb-6">Sistema IoT Escolar — BIENVENIDO</div>

          <form onSubmit={(e)=>{e.preventDefault(); alert('Demo de login');}} className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <input className="input" placeholder="tu.email@ejemplo.com"/>
            </div>
            <div>
              <label className="block mb-1">Contraseña</label>
              <input type="password" className="input" placeholder="••••••••"/>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox"/><span>Recordarme</span>
              </label>
              <a className="text-blue-300 hover:underline" href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <button className="btn btn-indigo w-full">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}
