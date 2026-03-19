import Layout from './components/Layout'
import { useThreats } from './hooks/useThreats'

function App() {
  const threatState = useThreats()

  return <Layout {...threatState} />
}

export default App
