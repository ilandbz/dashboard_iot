import { useEffect, useState } from "react";
import CardMetric from "../components/CardMetric";

export default function Inicio({ onNavigate }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      { id: 1, title: "Temperatura Promedio (Hoy)", value: "22 °C",
        extra: "Min: 18 °C | Máx: 26 °C\nVariación: +2 °C VS Ayer",
        keyNav: "temperatura" },
      { id: 2, title: "Humedad Promedio (Hoy)", value: "65 %",
        extra: "Min: 58 % | Máx: 72 %\nVariación: -3 % VS Ayer",
        keyNav: "humedad" },
      { id: 3, title: "Análisis Automático", value: "",
        extra: "Detección de comportamiento\nEstado emocional",
        keyNav: "analisis" },
      { id: 4, title: "Cantidad de estudiantes", value: "22",
        extra: "Asistidas: 22\nMasculino: 12\nFemenino: 10" },
      { id: 5, title: "Dispositivos encendidos", value: "2",
        extra: "Sensores activos: 6", keyNav: "dispositivos" },
    ]);
  }, []);

  const go = (keyNav) => {
    if (!keyNav) return;
    onNavigate?.(keyNav);         // << usar la prop
  };

  return (
    <div className="p-8">
      <div className="bg-[#0f0f2f] rounded-2xl p-6 text-white text-2xl font-bold mb-6">
        IoT en Aula Tigresitos
      </div>

      <div className="grid grid-cols-3 gap-6">
        {data.map((m) => (
          <div
            key={m.id}
            onClick={() => go(m.keyNav)}
            className={`cursor-pointer transition transform hover:scale-105 hover:shadow-xl ${
              m.keyNav ? "" : "pointer-events-none opacity-80"
            }`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && go(m.keyNav)}
          >
            <CardMetric title={m.title} value={m.value} extra={m.extra} />
          </div>
        ))}
      </div>
    </div>
  );
}
