import Map from './components/Map'
import logo from './assets/nsip-logo.svg'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Map />
      <div className="brand-card">
        <img src={logo} alt="NSIP logo" className="brand-logo" />
        <div className="brand-copy">
          <span className="brand-kicker">NSIP</span>
          <h1>Nigeria Security Intelligence Platform</h1>
        </div>
      </div>
    </div>
  )
}

export default App
