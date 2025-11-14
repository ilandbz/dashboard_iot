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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

// ==== DATOS MOCK (simulan el backend) ====
const MOCK_DISPOSITIVOS = [
  {
    id: 1,
    nombre: "Sensor Aula 1",
    tipo: "Temperatura",
    aula: "Tigresito Primaria 1 A",
  },
  {
    id: 2,
    nombre: "Sensor Humedad Aula 1",
    tipo: "Humedad",
    aula: "Tigresito Primaria 1 A",
  },
];

const MOCK_LECTURAS_POR_DISPOSITIVO = {
  1: {
    serie: [
      { hora: "08:00", valor: 18.2 },
      { hora: "08:15", valor: 18.6 },
      { hora: "08:30", valor: 19.1 },
      { hora: "08:45", valor: 19.4 },
      { hora: "09:00", valor: 20.0 },
      { hora: "09:15", valor: 20.3 },
      { hora: "09:30", valor: 20.1 },
      { hora: "09:45", valor: 19.8 },
      { hora: "10:00", valor: 19.6 },
    ],
    min: 18.2,
    max: 20.3,
    actual: 19.6,
  },
};

export default function Temperatura() {
  const [serie, setSerie] = useState([]);
  const [stats, setStats] = useState({ min: null, max: null, actual: null });
  const [err, setErr] = useState("");

  // --- FUNCIÓN getJSON usando MOCKS ---
  const getJSON = async (url) => {
    // 🔹 Cuando sea real backend, reemplazas TODO el cuerpo por:
    // const res = await fetch(url);
    // const text = await res.text();
    // const ct = res.headers.get('content-type') || '';
    // if (!res.ok) throw new Error(`${res.status} ${text.slice(0,120)}`);
    // if (!ct.includes('application/json')) throw new Error(`No JSON en ${url}: ${text.slice(0,120)}`);
    // return JSON.parse(text);

    // MOCK: /api/dispositivos
    if (url === "/api/dispositivos") {
      return Promise.resolve(MOCK_DISPOSITIVOS);
    }

    // MOCK: /api/lecturas/serie/:id
    const match = url.match(/\/api\/lecturas\/serie\/(\d+)/);
    if (match) {
      const id = Number(match[1]);
      const data = MOCK_LECTURAS_POR_DISPOSITIVO[id];
      if (!data) throw new Error(`No hay lecturas mock para dispositivo ${id}`);
      return Promise.resolve(data);
    }

    throw new Error(`URL mock no soportada: ${url}`);
  };

  useEffect(() => {
    (async () => {
      try {
        setErr("");

        const dispositivos = await getJSON("/api/dispositivos");
        const temp = dispositivos.find((d) => d.tipo === "Temperatura");
        if (!temp) throw new Error("No hay dispositivo de temperatura");

        const js = await getJSON(`/api/lecturas/serie/${temp.id}`);
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
          {/* clave para forzar remount y evitar “canvas in use” */}
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
