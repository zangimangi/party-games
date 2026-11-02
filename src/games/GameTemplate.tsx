import { useCallback, useState } from 'react'
import GameLayout from '../components/GameLayout'
import { usePlayerCount } from '../hooks/usePlayerCount'

/** Copy this page, replace the example panel/action, and add its route and menu card in App.tsx. */
export default function GameTemplate() {
  const [playerCount, setPlayerCount] = usePlayerCount()
  const [round, setRound] = useState(1)
  const reset = useCallback(() => setRound(1), [])
  const changePlayers = (count: number) => { setPlayerCount(count); reset() }

  return <GameLayout title="新しいゲーム" playerCount={playerCount} onPlayerCountChange={changePlayers} onReset={reset}>
    <section className="template-panel">
      <span className="eyebrow">GAME TEMPLATE</span>
      <h2>ゲーム固有の表示エリア</h2>
      <p>ここにルールやゲームの状態を表示します。</p>
      <div className="template-round">ROUND <strong>{round}</strong></div>
      <button className="button button-primary" onClick={() => setRound((current) => current + 1)}>ゲーム固有の操作</button>
    </section>
  </GameLayout>
}
