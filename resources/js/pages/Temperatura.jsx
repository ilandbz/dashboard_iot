import { useEffect, useState, useMemo } from "react";
import { Line } from "react-chartjs-2";

// REGISTRO CHARTJS (v4)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function Temperatura() {
  const [serie, setSerie] = useState([]);
  const [stats, setStats] = useState({ min: null, max: null, actual: null });
  const [err, setErr] = useState("");

  // 1) CARGA REAL DESDE BACKEND (SOLO UNA VEZ)
  useEffect(() => {
    let cancelado = false;

    const cargarDatosIniciales = async () => {
      try {
        setErr("");

        // si ya tienes /api/dispositivos úsalo,
        // sino puedes poner directamente const dispositivoId = 1;
        const resDisp = await fetch("/api/dispositivos");
        if (!resDisp.ok) throw new Error("Error cargando dispositivos");
        const dispositivos = await resDisp.json();

        const temp = dispositivos.find((d) => d.tipo === "Temperatura");
        if (!temp) throw new Error("No hay dispositivo de temperatura");

        const resLect = await fetch(`/api/lecturas/serie/${temp.id}`);
        if (!resLect.ok) throw new Error("Error cargando lecturas");

        const js = await resLect.json();
        if (cancelado) return;

        setSerie(js.serie || []);
        setStats({ min: js.min, max: js.max, actual: js.actual });
      } catch (e) {
        if (cancelado) return;
        console.error(e);
        setErr(e.message);
      }
    };

    cargarDatosIniciales();

    return () => {
      cancelado = true;
    };
  }, []);

  // 2) ANIMACIÓN LOCAL (NO LLAMA MÁS AL BACKEND)
  useEffect(() => {
    // solo empezamos animación cuando ya hay datos reales
    if (serie.length === 0) return;

    const id = setInterval(() => {
      setSerie((prev) => {
        if (!prev.length) return prev;

        const last = prev[prev.length - 1];

        // variación suave -0.3 a +0.3 °C
        const delta = +(Math.random() * 0.6 - 0.3).toFixed(1);
        const nuevoValor = +(last.valor + delta).toFixed(1);

        const now = new Date();
        const hora = now.toLocaleTimeString("es-PE", {
          hour: "2-digit",
          minute: "2-digit",
        });

        // mantenemos solo últimas 8–9 lecturas
        const nuevaSerie = [...prev.slice(-8), { hora, valor: nuevoValor }];

        const valores = nuevaSerie.map((p) => p.valor);
        const min = Math.min(...valores);
        const max = Math.max(...valores);
        const actual = nuevaSerie[nuevaSerie.length - 1].valor;

        // actualizamos stats usando la nueva serie
        setStats({ min, max, actual });

        return nuevaSerie;
      });
    }, 1000); // cada 1 segundo

    return () => clearInterval(id);
  }, [serie.length]); // se crea el intervalo solo cuando hay datos

  const data = useMemo(
    () => ({
      labels: serie.map((s) => s.hora),
      datasets: [
        {
          label: "Temp °C",
          data: serie.map((s) => s.valor),
          fill: true,
          tension: 0.35,
        },
      ],
    }),
    [serie]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: "rgba(255,255,255,.08)" } },
        y: { grid: { color: "rgba(255,255,255,.08)" } },
      },
    }),
    []
  );

  return (
    <div className="p-8 text-white">
      <div className="neon-header mb-6">
        Temperatura en el Aula Tigresito Primaria 1 A
      </div>

      {err && <div className="mb-4 bg-red-600/70 rounded-xl p-3">{err}</div>}

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-[#443a74] rounded-2xl p-4">
          Mínimo <b>{stats.min ?? "-"} °C</b>
        </div>
        <div className="bg-[#443a74] rounded-2xl p-4">
          Máximo <b>{stats.max ?? "-"} °C</b>
        </div>
        <div className="bg-[#443a74] rounded-2xl p-4">
          Nivel Actual <b>{stats.actual ?? "-"} °C</b>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div
          className="col-span-2 bg-[#2b2450] rounded-2xl p-4"
          style={{ height: 360 }}
        >
          <div className="mb-3">Historial registro</div>
          <Line key={serie.length} data={data} options={options} redraw />
        </div>
        <div className="bg-[#2b2450] rounded-2xl p-4">
          <div className="font-semibold mb-2">Temperatura IA</div>
          <div className="text-sm space-y-1">
            <div>
              Hora: <b>9:00</b>
            </div>
            <div>
              Día: <b>Lunes</b>
            </div>
            <div>
              N° personas: <b>22</b>
            </div>
            <div>
              Temperatura: <b>20 °C</b>
            </div>
            <div>
              Confianza: <b>0.89</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
