import { useCallback, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import ResetButtonOnGame from '../../components/ResetButtonOnGame'
import { usePlayerCount } from '../../hooks/usePlayerCount'

function randomNumber() {
  return Math.floor(Math.random() * 100) + 1
}

export default function HighLowGame() {
  const [playerCount, setPlayerCount] = usePlayerCount()
  const [number, setNumber] = useState<number | null>(null)

  const reset = useCallback(() => setNumber(null), [])
  const changePlayers = (count: number) => {
    setPlayerCount(count)
    reset()
  }

  return <GameLayout title="ハイアンドロー" playerCount={playerCount} onPlayerCountChange={changePlayers} onReset={reset}>
    <section className="game-feature high-low-card" aria-live="polite">
      {number === null ? <>
        <span className="eyebrow">HIGH OR LOW?</span>
        <p className="game-instruction">出題者は画面の数字を見て、1から100の数字を1つ選択する。<br />画面の数字が出題者が提示した数字より高いか低いか予想しよう。<br/>不正解の人は飲む！全員正解なら出題者が飲む！</p>
        <button className="button button-primary feature-button" onClick={() => setNumber(randomNumber())}>ゲーム開始</button>
      </> : <>
        <span className="eyebrow">NUMBER</span>
        <div className="high-low-number">{number}</div>
        <p className="game-instruction">出題者は回答者に画面を見せず、1から100の数字を選ぶ。<br /><strong>HIGH＆LOW</strong></p>
        <ResetButtonOnGame onClick={() => setNumber(randomNumber())} />
      </>}
    </section>
  </GameLayout>
}
