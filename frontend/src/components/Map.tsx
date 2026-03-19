import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { io } from 'socket.io-client'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { getThreats } from '../services/api'
import type { Threat } from '../types/threat'

delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })
  ._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const nigeriaCenter: [number, number] = [9.082, 8.6753]
const socket = io('http://127.0.0.1:5000', {
  autoConnect: false,
})

type ThreatMarker = Threat & {
  displayLat: number
  displayLng: number
}

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

function ThreatMap() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const threatMarkers = useMemo(() => buildThreatMarkers(threats), [threats])

  useEffect(() => {
    let isMounted = true

    async function loadThreats() {
      try {
        const data = await getThreats()

        if (!isMounted) {
          return
        }

        setThreats(data)
        setError(null)
      } catch (error) {
        if (!isMounted) {
          return
        }

        if (axios.isAxiosError(error)) {
          if (error.code === 'ECONNABORTED') {
            setError('Backend request timed out. Make sure the Flask server is running on port 5000.')
            return
          }

          if (!error.response) {
            setError('Cannot reach the backend. Start the Flask server on http://127.0.0.1:5000.')
            return
          }
        }

        setError('Failed to load threats.')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadThreats()
    const refreshInterval = window.setInterval(() => {
      void loadThreats()
    }, 10000)

    return () => {
      isMounted = false
      window.clearInterval(refreshInterval)
    }
  }, [])

  useEffect(() => {
    function handleThreatCreated(threat: Threat) {
      setThreats((currentThreats) => {
        if (currentThreats.some((existingThreat) => existingThreat.id === threat.id)) {
          return currentThreats
        }

        return [threat, ...currentThreats]
      })
      setError(null)
      setIsLoading(false)
    }

    socket.connect()
    socket.on('threat_created', handleThreatCreated)

    return () => {
      socket.off('threat_created', handleThreatCreated)
      socket.disconnect()
    }
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <MapContainer
      center={nigeriaCenter}
      zoom={6}
      scrollWheelZoom
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {threatMarkers.map((threat) => (
        <Marker key={threat.id} position={[threat.displayLat, threat.displayLng]}>
          <Popup>
            <strong>{threat.type}</strong>
            <br />
            {threat.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default ThreatMap
