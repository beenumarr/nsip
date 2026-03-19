import { useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { Threat } from '../types/threat'

const nigeriaCenter: [number, number] = [9.082, 8.6753]

type ThreatMapProps = {
  threats: Threat[]
  selectedThreatId: number | null
  onSelectThreat: (threat: Threat) => void
}

type ThreatMarker = Threat & {
  displayLat: number
  displayLng: number
}

const redMarkerIcon = L.divIcon({
  className: 'nsip-marker-shell',
  html: `
    <div class="nsip-marker-core">
      <div class="nsip-marker-pulse"></div>
      <div class="nsip-marker-pin"></div>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 24],
  popupAnchor: [0, -18],
})

const activeMarkerIcon = L.divIcon({
  className: 'nsip-marker-shell',
  html: `
    <div class="nsip-marker-core">
      <div class="nsip-marker-pulse nsip-marker-pulse-active"></div>
      <div class="nsip-marker-pin nsip-marker-pin-active"></div>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [15, 25],
  popupAnchor: [0, -18],
})

function buildThreatMarkers(threats: Threat[]): ThreatMarker[] {
  const groupedThreats = new Map<string, Threat[]>()

  for (const threat of threats) {
    const key = `${threat.lat.toFixed(3)}:${threat.lng.toFixed(3)}`
    const existing = groupedThreats.get(key) ?? []
    existing.push(threat)
    groupedThreats.set(key, existing)
  }

  return Array.from(groupedThreats.values()).flatMap((group) => {
    if (group.length === 1) {
      const [threat] = group

      return [{ ...threat, displayLat: threat.lat, displayLng: threat.lng }]
    }

    return group.map((threat, index) => {
      const angle = (Math.PI * 2 * index) / group.length
      const offset = 0.03

      return {
        ...threat,
        displayLat: threat.lat + Math.sin(angle) * offset,
        displayLng: threat.lng + Math.cos(angle) * offset,
      }
    })
  })
}

function ThreatMap({
  threats,
  selectedThreatId,
  onSelectThreat,
}: ThreatMapProps) {
  const threatMarkers = useMemo(() => buildThreatMarkers(threats), [threats])

  return (
    <MapContainer
      center={nigeriaCenter}
      zoom={6}
      scrollWheelZoom
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; Esri & contributors"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <TileLayer
        attribution="&copy; Esri"
        opacity={0.9}
        url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
      />

      {threatMarkers.map((threat) => (
        <Marker
          key={threat.id}
          position={[threat.displayLat, threat.displayLng]}
          icon={threat.id === selectedThreatId ? activeMarkerIcon : redMarkerIcon}
          eventHandlers={{
            click: () => onSelectThreat(threat),
          }}
        >
          <Popup>
            <strong>{threat.type}</strong>
            <br />
            {threat.location}
            <br />
            <span>{new Date(threat.created_at).toLocaleString()}</span>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default ThreatMap
