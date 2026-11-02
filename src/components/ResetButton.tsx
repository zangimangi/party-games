type Props = { onClick: () => void }
export default function ResetButtonOnGame({ onClick }: Props) {
  return <button className="button button-quiet reset-button" type="button" onClick={onClick}>↻ <span>もう一度</span></button>
}
