import { useRef, useState } from "react";

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [open,setOpen] = useState(false);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video:true });
    videoRef.current.srcObject = stream;
    setOpen(true);
  };

  const take = () => {
    const v = videoRef.current;
    const c = canvasRef.current;
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext('2d').drawImage(v,0,0);
    const b64 = c.toDataURL('image/png');
    onCapture(b64);
    // detener cámara
    v.srcObject.getTracks().forEach(t=>t.stop());
    setOpen(false);
  };

  return (
    <div className="space-x-2">
      {!open && <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={start}>
        Activar/seleccionar cámara
      </button>}
      {open && (
        <div className="flex items-center gap-4">
          <video ref={videoRef} autoPlay className="w-64 rounded-xl border border-blue-400"/>
          <button onClick={take} className="px-4 py-2 rounded-xl bg-indigo-500">Capturar</button>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      )}
    </div>
  );
}
