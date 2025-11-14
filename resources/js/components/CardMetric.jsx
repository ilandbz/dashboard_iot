export default function CardMetric({ title, value, extra }) {
  return (
    <div className="bg-[#101028] rounded-2xl p-5 text-white shadow-[0_0_18px_#6b5cff33]">
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-3xl font-bold my-2">{value}</div>
      {extra && <div className="text-sm text-gray-300">{extra}</div>}
    </div>
  );
}
