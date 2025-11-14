import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
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
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function Humedad() {
  const [serie, setSerie] = useState([]);
  const [stats, setStats] = useState({ min: null, max: null, actual: null });
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const dispositivos = await getJSON("/api/dispositivos");
        // Busca por tipo === 'Humedad' (ajústalo si tu API usa otro nombre)
        const hum = dispositivos.find((d) => d.tipo === "Humedad");
        if (!hum) throw new Error("No hay dispositivo de humedad");
        const js = await getJSON(`/api/lecturas/serie/${hum.id}`);
        setSerie(js.serie || []);
        setStats({ min: js.min, max: js.max, actual: js.actual });
      } catch (e) {
        setErr(e.message);
        console.error(e);
      }
    })();
  }, []);

  const data = useMemo(
    () => ({
      labels: serie.map((s) => s.hora),
      datasets: [
        {
          label: "Humedad %",
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
      <div className="neon-header mb-6">Humedad en el Aula Tigresito Primaria 1 A</div>

      {err && <div className="mb-4 bg-red-600/70 rounded-xl p-3">{err}</div>}

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-[#443a74] rounded-2xl p-4">Mínimo <b>{stats.min ?? "-"} %</b></div>
        <div className="bg-[#443a74] rounded-2xl p-4">Máximo <b>{stats.max ?? "-"} %</b></div>
        <div className="bg-[#443a74] rounded-2xl p-4">Nivel Actual <b>{stats.actual ?? "-"} %</b></div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-[#2b2450] rounded-2xl p-4" style={{ height: 360 }}>
          <div className="mb-3">Historial registro</div>
          <Line key={serie.length} data={data} options={options} redraw />
        </div>
        <div className="bg-[#2b2450] rounded-2xl p-4">
          <div className="font-semibold mb-2">Humedad IA</div>
          <div className="text-sm space-y-1">
            <div>Hora: <b>9:00</b></div>
            <div>Día: <b>Lunes</b></div>
            <div>N° personas: <b>22</b></div>
            <div>Humedad: <b>{stats.actual ?? "-"} %</b></div>
            <div>Confianza: <b>0.89</b></div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getJSON(url) {
  const res = await fetch(url);
  const text = await res.text();
  const ct = res.headers.get("content-type") || "";
  if (!res.ok) throw new Error(`${res.status} ${text.slice(0, 120)}`);
  if (!ct.includes("application/json")) throw new Error(`No JSON en ${url}: ${text.slice(0, 120)}`);
  return JSON.parse(text);
}
