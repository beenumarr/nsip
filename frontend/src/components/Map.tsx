import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { threats } from '../data/threats'

delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })
  ._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const nigeriaCenter: [number, number] = [9.082, 8.6753]

function Map() {
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

      {threats.map((threat) => (
        <Marker key={threat.id} position={[threat.lat, threat.lng]}>
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

export default Map
