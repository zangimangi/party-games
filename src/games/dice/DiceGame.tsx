import { useCallback, useEffect, useRef, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import { usePlayerCount } from '../../hooks/usePlayerCount'
import ResetButtonOnGame from '../../components/ResetButtonOnGame'

type Result = { type: 'winner'; player: number } | { type: 'target'; player: number }
const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']

export default function DiceGame() {
  const [playerCount, setPlayerCount] = usePlayerCount()
  const [remaining, setRemaining] = useState(playerCount * 5)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [die, setDie] = useState<number | null>(null)
  const [rolling, setRolling] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [lastRoll, setLastRoll] = useState<{ player: number; value: number } | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rollingRef = useRef(false)

  const reset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    rollingRef.current = false
    setRolling(false); setRemaining(playerCount * 5); setCurrentPlayer(1); setDie(null)
    setResult(null); setLastRoll(null)
  }, [playerCount])

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const changePlayers = (count: number) => {
    if (timer.current) clearTimeout(timer.current)
    rollingRef.current = false
    setPlayerCount(count); setRemaining(count * 5); setCurrentPlayer(1); setDie(null); setRolling(false); setResult(null); setLastRoll(null)
  }

  const roll = () => {
    if (rollingRef.current || result) return
    rollingRef.current = true
    setRolling(true)
    const value = Math.floor(Math.random() * 6) + 1
    timer.current = setTimeout(() => {
      setDie(value)
      setRolling(false)
      rollingRef.current = false
      setLastRoll({ player: currentPlayer, value })
      const next = remaining - value
      setRemaining(next)
      if (next < 0) setResult({ type: 'winner', player: currentPlayer })
      else if (next === 0) setResult({ type: 'target', player: currentPlayer })
      else setCurrentPlayer((player) => player % playerCount + 1)
    }, 850)
  }

  const initialValue = playerCount * 5

  return <GameLayout title="サイコロチキンレース" playerCount={playerCount} onPlayerCountChange={changePlayers} onReset={reset}>
    <section className="dice-card" aria-live="polite">
      <div className={`remaining-panel ${remaining < 0 ? 'is-negative' : remaining === 0 ? 'is-zero' : ''}`}>
        <span className="eyebrow">のこり設定値</span>
        <div className="remaining-number">{remaining}<small> / {initialValue}</small></div>
        <div className="meter"><span style={{ width: `${Math.max(0, Math.min(100, remaining / initialValue * 100))}%` }} /></div>
      </div>

      {!result && <div className="turn-label"><span><b>{currentPlayer}人目</b>の番</span></div>}
      <div className={`die ${rolling ? 'is-rolling' : ''}`} aria-label={die ? `${die}の目` : 'サイコロ'}>{die ? faces[die - 1] : '⚄'}</div>
      {lastRoll && !rolling && <p className="last-roll"><strong>{lastRoll.value}</strong> を出しました</p>}

      {!result && <button className="button button-primary roll-button" onClick={roll} disabled={rolling}>
        {rolling ? '' : 'サイコロを振る'} <span aria-hidden="true"></span>
      </button>}

      {result?.type === 'target' && <div className="result-panel result-target">
        <span className="result-stamp">JUST RIGHT!</span>
        <h2>CHOOSE</h2>
        <ResetButtonOnGame onClick={reset} />
        <p className="rule-note">あなたの勝ち。誰か選んでください。</p>
      </div>}
      {result?.type === 'winner' && <div className="result-panel result-loss">
        <span className="result-stamp">YOU ARE OUT!</span>
        <h2><strong>YOU</strong></h2>
        <ResetButtonOnGame onClick={reset} />
        <p className="rule-note">あなたの負け。あなた一気にいっちゃって。</p>
      </div>}
      {!result && <p className="rule-note">設定値を超えたらアウト。ぴったりなら指名！</p>}
    </section>
  </GameLayout>
}
