import { useCallback, useState } from 'react'
import GameLayout from '../../components/GameLayout'
import ResetButtonOnGame from '../../components/ResetButtonOnGame'
import { usePlayerCount } from '../../hooks/usePlayerCount'

type Vote = 'yes' | 'no'

export default function MinorityGame() {
  const [playerCount, setPlayerCount] = usePlayerCount()
  const [votes, setVotes] = useState<Vote[]>([])
  const [revealed, setRevealed] = useState(false)

  const reset = useCallback(() => {
    setVotes([])
    setRevealed(false)
  }, [])
  const changePlayers = (count: number) => {
    setPlayerCount(count)
    reset()
  }

  const submitVote = (vote: Vote) => setVotes((current) => [...current, vote])
  const yesCount = votes.filter((vote) => vote === 'yes').length
  const noCount = votes.length - yesCount
  const hasMinority = yesCount !== noCount
  const minority: Vote | null = yesCount < noCount ? 'yes' : noCount < yesCount ? 'no' : null

  return <GameLayout title="多数派ゲーム" playerCount={playerCount} onPlayerCountChange={changePlayers} onReset={reset}>
    <section className="game-feature minority-card" aria-live="polite">
      {!revealed && votes.length < playerCount && <>
        <span className="eyebrow">MAJORITY OR MINORITY?</span>
        <p className="game-instruction">出題者はお題を決める。<br />答えを他の人に見られないように選ぼう。<br/>最終的に少数派の人が飲む！</p>
        <div className="answer-turn">{votes.length + 1}人目の回答</div>
        <div className="vote-buttons">
          <button className="vote-button vote-yes" aria-label="はい" onClick={() => submitVote('yes')}>○</button>
          <button className="vote-button vote-no" aria-label="いいえ" onClick={() => submitVote('no')}>×</button>
        </div>
      </>}

      {!revealed && votes.length === playerCount && <>
        <span className="eyebrow">ALL ANSWERS IN</span>
        <p className="game-instruction">全員の回答が終わりました。</p>
        <button className="button button-primary feature-button" onClick={() => setRevealed(true)}>結果を見る</button>
      </>}

      {revealed && <div className="minority-result">
        <span className="eyebrow">THE RESULT</span>
        <h2>投票結果</h2>
        <div className="vote-counts">
          <div><span>○ はい</span><strong>{yesCount}</strong><small>人</small></div>
          <div><span>× いいえ</span><strong>{noCount}</strong><small>人</small></div>
        </div>
        {hasMinority ? <p className="minority-drink">少数派の <strong>{minority === 'yes' ? '○ はい' : '× いいえ'}</strong> を選んだ人が飲む！</p>
          : <p className="minority-drink">同数のため、少数派はいません。</p>}
        <ResetButtonOnGame onClick={reset} />
      </div>}
    </section>
  </GameLayout>
}
