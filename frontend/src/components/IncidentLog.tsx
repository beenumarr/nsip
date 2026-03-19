import type { Threat } from '../types/threat'

type IncidentLogProps = {
  threats: Threat[]
  selectedThreat: Threat | null
  onSelectThreat: (threat: Threat) => void
}

function IncidentLog({
  threats,
  selectedThreat,
  onSelectThreat,
}: IncidentLogProps) {
  const activeThreat = selectedThreat ?? threats[0] ?? null

  return (
    <aside className="pointer-events-none absolute right-5 top-26 z-[1040] flex h-[calc(100vh-8rem)] w-[360px] flex-col rounded-[1.65rem] border border-white/10 bg-[rgba(19,19,19,0.9)] text-white shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
      <div className="pointer-events-auto flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/45">Focus</p>
          <h2 className="mt-1 text-xl font-semibold">
            {activeThreat?.location ?? 'Nigeria'}
          </h2>
        </div>
        <button className="text-3xl leading-none text-white/70 transition hover:text-white">
          ×
        </button>
      </div>

      <div className="pointer-events-auto flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="relative overflow-hidden rounded-[1.4rem] bg-[radial-gradient(circle_at_top,_rgba(129,212,250,0.35),_transparent_42%),linear-gradient(145deg,_rgba(82,114,129,0.9),_rgba(29,38,49,0.96))]">
            <div className="aspect-[5/4] w-full bg-[linear-gradient(180deg,rgba(118,181,211,0.45),rgba(12,17,24,0.2)_38%,rgba(12,17,24,0.78)),radial-gradient(circle_at_center,_rgba(255,255,255,0.1),_transparent_55%)]" />
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(9,12,18,0.92))] p-4">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300/75">
                Live Intel Snapshot
              </p>
              <p className="mt-2 text-lg font-semibold">
                {activeThreat?.type ?? 'No incident selected'}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-4 text-[15px] leading-7 text-white/85">
            <p>
              {activeThreat
                ? `${activeThreat.location} remains under active monitoring. This incident is synchronized with the operational map and live threat stream for rapid geospatial awareness.`
                : 'Select a threat marker to inspect location context and reporting details.'}
            </p>

            {activeThreat && (
              <>
                <div className="flex items-center gap-3 text-sm text-white/75">
                  <span className="text-lg">⌖</span>
                  <span>{activeThreat.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/75">
                  <span className="text-lg">◷</span>
                  <span>{new Date(activeThreat.created_at).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/75">
                  <span className="text-lg">⌘</span>
                  <span>nigeria.gov.ng</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-white/45">
              Incident Feed
            </p>
            <span className="text-xs text-cyan-300">{threats.length} records</span>
          </div>

          <div className="mt-4 space-y-2">
            {threats.map((threat) => {
              const isActive = activeThreat?.id === threat.id

              return (
                <button
                  key={threat.id}
                  onClick={() => onSelectThreat(threat)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    isActive
                      ? 'border-cyan-400/40 bg-cyan-400/10'
                      : 'border-white/8 bg-white/4 hover:border-white/20 hover:bg-white/8'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white">{threat.type}</p>
                      <p className="mt-1 text-sm text-white/60">{threat.location}</p>
                    </div>
                    <span className="rounded-full bg-red-500/16 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-red-200">
                      Live
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-white/45">
                    {new Date(threat.created_at).toLocaleString()}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="pointer-events-auto border-t border-white/10 p-4">
        <button className="w-full rounded-full bg-[#0b6aa8] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(11,106,168,0.35)] transition hover:bg-[#1182ca]">
          Save To Project
        </button>
      </div>
    </aside>
  )
}

export default IncidentLog
