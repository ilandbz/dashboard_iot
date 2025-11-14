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

// ==== DATOS MOCK INICIALES ====
const MOCK_DISPOSITIVOS = [
  {
    id: 1,
    nombre: "Sensor Aula 1",
    tipo: "Temperatura",
    aula: "Tigresito Primaria 1 A",
  },
];

let mockLecturas = {
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
};

export default function Temperatura() {
  const [serie, setSerie] = useState([]);
  const [stats, setStats] = useState({ min: null, max: null, actual: null });
  const [err, setErr] = useState("");

  // --- FUNCIÓN getJSON usando MOCKS DINÁMICOS ---
  const getJSON = async (url) => {
    // cuando cambies a backend real, reemplazas TODO esto por fetch()

    if (url === "/api/dispositivos") {
      return MOCK_DISPOSITIVOS;
    }

    const match = url.match(/\/api\/lecturas\/serie\/(\d+)/);
    if (match) {
      // 👉 aquí simulamos que llega una nueva lectura cada vez
      const last = mockLecturas.serie[mockLecturas.serie.length - 1];

      // hora nueva (solo para ver cambio)
      const now = new Date();
      const hora = now.toLocaleTimeString("es-PE", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // temperatura nueva (random alrededor del último valor)
      const delta = (Math.random() * 0.6 - 0.3).toFixed(1); // -0.3 a +0.3
      const nuevoValor = +(last.valor + Number(delta)).toFixed(1);

      const nuevaSerie = [
        ...mockLecturas.serie.slice(-8), // mantén solo últimas 8
        { hora, valor: nuevoValor },
      ];

      const valores = nuevaSerie.map((p) => p.valor);
      const min = Math.min(...valores);
      const max = Math.max(...valores);
      const actual = nuevaSerie[nuevaSerie.length - 1].valor;

      mockLecturas = { serie: nuevaSerie, min, max, actual };
      return mockLecturas;
    }

    throw new Error(`URL mock no soportada: ${url}`);
  };

  useEffect(() => {
    let cancelado = false;

    const cargarDatos = async () => {
      try {
        console.log("⏱ tick temperatura");
        setErr("");

        const dispositivos = await getJSON("/api/dispositivos");
        const temp = dispositivos.find((d) => d.tipo === "Temperatura");
        if (!temp) throw new Error("No hay dispositivo de temperatura");

        const js = await getJSON(`/api/lecturas/serie/${temp.id}`);
        if (cancelado) return;

        setSerie(js.serie || []);
        setStats({ min: js.min, max: js.max, actual: js.actual });
      } catch (e) {
        if (cancelado) return;
        setErr(e.message);
        console.error(e);
      }
    };

    // primera carga
    cargarDatos();

    // recarga cada 1 segundo
    const id = setInterval(cargarDatos, 1000);

    return () => {
      cancelado = true;
      clearInterval(id);
    };
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
