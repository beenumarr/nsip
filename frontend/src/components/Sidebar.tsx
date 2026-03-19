type SidebarProps = {
  totalThreats: number
  activeIncidents: number
}

function Sidebar({ totalThreats, activeIncidents }: SidebarProps) {
  return (
    <div className="pointer-events-none absolute bottom-6 left-6 z-[1050] flex flex-col gap-3">
      <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-white/12 bg-black/58 px-3 py-3 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="h-14 w-14 rounded-xl bg-[linear-gradient(145deg,_rgba(182,230,255,0.95),_rgba(119,187,255,0.6)_52%,_rgba(18,47,104,0.85)_100%)] p-1.5">
          <div className="flex h-full w-full items-center justify-center rounded-[0.7rem] bg-[radial-gradient(circle_at_top_left,_rgba(231,255,255,0.92),_rgba(81,160,255,0.28)_58%,_rgba(14,28,68,0.85)_100%)] text-[10px] font-semibold uppercase tracking-[0.24em] text-white/90">
            Earth
          </div>
        </div>
        <div className="min-w-[170px]">
          <p className="text-[11px] uppercase tracking-[0.34em] text-white/45">
            Ops Layer
          </p>
          <p className="mt-1 text-sm font-medium text-white/90">
            Nigeria Security Intelligence Platform
          </p>
        </div>
      </div>

      <div className="pointer-events-auto grid grid-cols-2 gap-2 rounded-2xl border border-white/12 bg-black/52 p-3 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="rounded-xl bg-white/6 px-3 py-3">
          <p className="text-[10px] uppercase tracking-[0.26em] text-white/45">Threats</p>
          <p className="mt-2 text-2xl font-semibold">{totalThreats}</p>
        </div>
        <div className="rounded-xl bg-white/6 px-3 py-3">
          <p className="text-[10px] uppercase tracking-[0.26em] text-white/45">Active</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-300">
            {activeIncidents}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
