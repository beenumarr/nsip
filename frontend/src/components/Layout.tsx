import { useEffect, useState } from 'react'
import Header from './Header'
import IncidentLog from './IncidentLog'
import MapView from './MapView'
import Sidebar from './Sidebar'
import type { Threat } from '../types/threat'

type LayoutProps = {
  threats: Threat[]
  isLoading: boolean
  error: string | null
}

function Layout({ threats, isLoading, error }: LayoutProps) {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null)

  const totalThreats = threats.length
  const activeIncidents = threats.filter((threat) => {
    const createdAt = new Date(threat.created_at).getTime()
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000

    return Number.isFinite(createdAt) && createdAt >= oneDayAgo
  }).length

  const sortedThreats = [...threats].sort((left, right) => {
    return (
      new Date(right.created_at).getTime() - new Date(left.created_at).getTime()
    )
  })

  useEffect(() => {
    if (!sortedThreats.length) {
      setSelectedThreat(null)
      return
    }

    setSelectedThreat((currentThreat) => {
      if (!currentThreat) {
        return sortedThreats[0]
      }

      const updatedThreat = sortedThreats.find(
        (threat) => threat.id === currentThreat.id,
      )

      return updatedThreat ?? sortedThreats[0]
    })
  }, [sortedThreats])

  return (
    <div className="relative h-screen overflow-hidden bg-[#0c0d10] text-white">
      <MapView
        threats={sortedThreats}
        selectedThreat={selectedThreat}
        isLoading={isLoading}
        error={error}
        onSelectThreat={setSelectedThreat}
      />

      <Header totalThreats={totalThreats} />
      <Sidebar totalThreats={totalThreats} activeIncidents={activeIncidents} />
      <IncidentLog
        threats={sortedThreats}
        selectedThreat={selectedThreat}
        onSelectThreat={setSelectedThreat}
      />
    </div>
  )
}

export default Layout
