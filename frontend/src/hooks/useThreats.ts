import { useEffect, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import { getThreats } from '../services/api'
import type { Threat } from '../types/threat'

const socket = io('http://127.0.0.1:5000', {
  autoConnect: false,
})

export function useThreats() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
            setError(
              'Backend request timed out. Make sure the Flask server is running on port 5000.',
            )
            return
          }

          if (!error.response) {
            setError(
              'Cannot reach the backend. Start the Flask server on http://127.0.0.1:5000.',
            )
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

  return {
    threats,
    isLoading,
    error,
  }
}
