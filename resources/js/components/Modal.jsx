export default function Modal({ open, title, onClose, children, footer }) {
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}/>
      <div className="relative bg-[#2211ff] rounded-2xl shadow-[0_0_35px_#6b5cff66] w-[980px] max-w-[95vw]">
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/20">
          <div className="text-white font-bold text-lg">{title}</div>
          <button onClick={onClose} className="text-pink-300 font-semibold">Cancelar</button>
        </div>
        <div className="p-6">{children}</div>
        {footer && <div className="px-6 pb-6">{footer}</div>}
      </div>
    </div>
  );
}
