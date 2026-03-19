import ThreatMap from './Map'
import type { Threat } from '../types/threat'

type MapViewProps = {
  threats: Threat[]
  selectedThreat: Threat | null
  isLoading: boolean
  error: string | null
  onSelectThreat: (threat: Threat) => void
}

function MapView({
  threats,
  selectedThreat,
  isLoading,
  error,
  onSelectThreat,
}: MapViewProps) {
  return (
    <section className="relative h-full w-full overflow-hidden bg-[#0b0f17]">
      <ThreatMap
        threats={threats}
        selectedThreatId={selectedThreat?.id ?? null}
        onSelectThreat={onSelectThreat}
      />

      <div className="pointer-events-none absolute bottom-6 right-6 z-[1020] flex items-end gap-3">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2 text-white/80 backdrop-blur-xl">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/6 text-lg transition hover:bg-white/12">
            −
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/6 text-lg transition hover:bg-white/12">
            +
          </button>
        </div>

        <div className="pointer-events-auto rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
          <span className="font-medium text-white">Camera:</span> 2,351 km
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1010] flex items-center justify-between bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))] px-5 pb-3 pt-12 text-[12px] text-white/70">
        <div className="flex items-center gap-5">
          <span className="font-semibold text-white">NSIP Earth View</span>
          <span>100%</span>
          <span>Data attribution</span>
          <span>{selectedThreat ? selectedThreat.location : 'Nigeria'}</span>
        </div>
        <div className="hidden items-center gap-5 md:flex">
          <span>300 km</span>
          <span>11°13'18.97"N</span>
          <span>11°32'29.38"E</span>
        </div>
      </div>

      {(isLoading || error) && (
        <div className="pointer-events-none absolute inset-0 z-[1080] flex items-center justify-center bg-black/35 backdrop-blur-[2px]">
          <div className="pointer-events-auto rounded-2xl border border-white/10 bg-[rgba(18,18,18,0.92)] px-6 py-5 text-center text-white shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
            <p className="text-sm font-medium">
              {isLoading ? 'Loading earth imagery and incident feed...' : error}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default MapView
