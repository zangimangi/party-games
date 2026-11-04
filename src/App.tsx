import { useEffect, useState } from 'react'
import Home from './pages/Home'
import DiceGame from './games/dice/DiceGame'
import HighLowGame from './games/high-low/HighLowGame'
import MinorityGame from './games/minority/MinorityGame'

function readRoute() { return window.location.hash.replace(/^#\/?/, '') || 'home' }
export default function App() {
  const [route, setRoute] = useState(readRoute)
  useEffect(() => { const update = () => setRoute(readRoute()); window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update) }, [])
  if (route === 'dice') return <DiceGame />
  if (route === 'high-low') return <HighLowGame />
  if (route === 'minority') return <MinorityGame />
  return <Home onOpenGame={(game) => { window.location.hash = `/${game}` }} />
}
