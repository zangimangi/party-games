import { useEffect, useState, type CSSProperties } from 'react'
import { usePlayerCount } from '../../hooks/usePlayerCount'
import './roulette.css'

type Color = 'red' | 'black'
type SpinResult = { color: Color }
const SPIN_DURATION = 7000

export default function RouletteGame() {
  const [playerCount, setPlayerCount] = usePlayerCount()
  const [votes, setVotes] = useState<Color[]>([])
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<SpinResult | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [round, setRound] = useState(1)

  useEffect(() => {
    if (!spinning) return
    const timer = window.setTimeout(() => {
      setSpinning(false)
      const pointerAngle = ((360 - (rotation % 360)) % 360 + 360) % 360
      const landedSlot = Math.floor(pointerAngle / 45)
      setResult({ color: landedSlot % 2 === 0 ? 'red' : 'black' })
      setRevealed(true)
    }, SPIN_DURATION)
    return () => window.clearTimeout(timer)
  }, [spinning, rotation])

  const addVote = (vote: Color) => setVotes((current) => [...current, vote])
  const startSpin = () => {
    if (spinning || votes.length !== playerCount) return
    // Eight 45-degree sectors alternate red/black, starting with red at the pointer.
    const slot = Math.floor(Math.random() * 8)
    const sectorCenter = slot * 45 + 22.5
    const currentPhase = ((rotation % 360) + 360) % 360
    const turnToPointer = (360 - sectorCenter - currentPhase + 720) % 360
    setResult(null)
    setRotation(rotation + 360 * 7 + turnToPointer)
    setSpinning(true)
  }
  const nextRound = () => {
    setVotes([])
    setResult(null)
    setRevealed(false)
    setRound((value) => value + 1)
  }

  const remainingVoters = playerCount - votes.length
  const isReadyToSpin = votes.length === playerCount && !result
  const wrongGuesses = result ? votes.filter((vote) => vote !== result.color).length : 0

  return <main className="game-page roulette-page">
    <header className="game-header">
      <a className="back-link" href="#/">← メニュー</a>
      <h1>ルーレット</h1>
      <div className="game-controls">
        <label className="player-count-control">参加人数
          <select aria-label="参加人数" value={playerCount} disabled={votes.length > 0 || spinning} onChange={(event) => setPlayerCount(Number(event.target.value))}>
            {Array.from({ length: 8 }, (_, index) => index + 3).map((count) => <option key={count} value={count}>{count}人</option>)}
          </select>
        </label>
        <button className="button button-quiet" onClick={nextRound}>リセット</button>
      </div>
    </header>

    <section className="roulette-rules">
      <span className="eyebrow">HOW TO PLAY</span>
      <h2>赤か黒か、運試し。</h2>
      <ol><li>全員が結果を予想し、赤か黒に投票</li><li>全員の投票後、ルーレットを回す</li><li>止まった色を発表。外れた人が飲む</li></ol>
    </section>

    <section className="roulette-table" aria-live="polite">
      <div className="roulette-status"><span>ROUND {String(round).padStart(2, '0')}</span><span>{revealed ? 'RESULT' : spinning ? 'SPINNING' : isReadyToSpin ? 'PLACE YOUR BET' : 'VOTE'}</span></div>
      <div className="wheel-scene">
        <div className="wheel-pointer" aria-hidden="true">▼</div>
        <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }} aria-label="赤黒のルーレット">
          <div className="wheel-hub">◎</div>
        </div>
        <span className={`roulette-ball ${spinning ? 'ball-moving' : ''}`} style={{ '--ball-angle': '0deg' } as CSSProperties}>●</span>
      </div>

      {revealed && result ? <div className="roulette-outcome">
        <span>ルーレットの結果</span>
        <strong className={result.color}>{result.color === 'red' ? '赤' : '黒'}</strong>
        <p>{wrongGuesses ? `予想が外れた${wrongGuesses}人が飲む！` : '全員的中！今回は飲む人なし！'}</p>
        <button className="button button-primary feature-button" onClick={nextRound}>次のゲームへ <span>→</span></button>
      </div> : <div className="roulette-voting">
        {!spinning && !isReadyToSpin && <>
          <p className="roulette-turn">{votes.length + 1}人目の予想 <small>投票して、自分の予想を覚えていてください。</small></p>
          <div className="roulette-vote-buttons"><button onClick={() => addVote('red')}><i className="red-dot"/>赤</button><button onClick={() => addVote('black')}><i className="black-dot"/>黒</button></div>
          {votes.length > 0 && <p className="votes-ready">残り {remainingVoters}人</p>}
        </>}
        {isReadyToSpin && <>
          <p className="votes-ready">全員の投票が完了しました。</p>
          <button className="button button-primary feature-button spin-button" onClick={startSpin}>ルーレットを回す <span>↻</span></button>
        </>}
        {spinning && <p className="spinning-copy">ルーレット回転中…</p>}
      </div>}
      <p className="roulette-footnote">参加者 {playerCount}人 · 外れた人が飲む</p>
    </section>
  </main>
}
