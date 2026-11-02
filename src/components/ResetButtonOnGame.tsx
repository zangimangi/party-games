type Props = { onClick: () => void }
export default function ResetButtonOnGame({ onClick }: Props) {
  return <button className="button button-primary next-game-button" type="button" onClick={onClick}>次のゲームへ <span aria-hidden="true"></span></button>
}
