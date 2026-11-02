import PlayerCountSelector from './PlayerCountSelector'
import ResetButton from './ResetButton'

type Props = { title: string; playerCount: number; onPlayerCountChange: (count: number) => void; onReset: () => void }
export default function GameHeader({ title, playerCount, onPlayerCountChange, onReset }: Props) {
  return <header className="game-header">
    <a className="back-link" href="#/">← メニュー</a>
    <h1>{title}</h1>
    <div className="game-controls"><PlayerCountSelector value={playerCount} onChange={onPlayerCountChange} /><ResetButton onClick={onReset} /></div>
  </header>
}
