type Props = { value: number; onChange: (value: number) => void }

export default function PlayerCountSelector({ value, onChange }: Props) {
  return <label className="player-count-control">
    <span>参加人数</span>
    <select aria-label="参加人数" value={value} onChange={(event) => onChange(Number(event.target.value))}>
      {Array.from({ length: 19 }, (_, i) => i + 2).map((count) => <option key={count} value={count}>{count}人</option>)}
    </select>
  </label>
}
