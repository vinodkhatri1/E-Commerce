const StatCard = ({ label, val, icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
    <div className={`p-4 rounded-2xl ${color} shadow-sm`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400">{label}</p>
      <p className="text-2xl font-black">{val}</p>
    </div>
  </div>
);

export default StatCard;
