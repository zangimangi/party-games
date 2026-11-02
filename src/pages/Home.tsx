type Props = { onOpenGame: (game: string) => void }
const games = [{ id: 'dice', number: '01', title: 'サイコロチキンレース', description: '決められた値を超えたらアウト！ピッタリを狙え！！', players: '2–20人', icon: '⚄', accent: 'coral' }]

export default function Home({ onOpenGame }: Props) {
  return <main className="home-page">
    <header className="home-top"><a className="brand" href="#/"><span className="brand-mark">呑</span> 呑みゲー！</a><span className="top-note">呑ませ！かませ！</span></header>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow">呑みゲー用パーティーゲームコレクション</span><h1>あの子のパンティー<br /><em>何色や。</em></h1><p>見せつけたれ睾丸。目に焼き付けろ！</p><a href="#games" className="hero-link">ゲームを選ぶ <span>↓</span></a></div>
      <div className="hero-art" aria-hidden="true"><div className="sun-shape"/><div className="hero-die">⚄</div><span className="spark spark-one">✳</span><span className="spark spark-two">✦</span><span className="art-caption">GO HOME?<br />いや、アルコール</span></div>
    </section>
    <section className="games-section" id="games"><div className="section-heading"><div><span className="eyebrow">PICK YOUR GAME</span><h2>ゲームを<span>選択</span></h2></div><span className="game-count">{String(games.length).padStart(2, '0')} GAMES</span></div>
      <div className="game-grid">{games.map((game) => <article className={`game-card ${game.accent}`} key={game.id}>
        <div className="card-top"><span className="card-number">{game.number} / GAME</span><span className="card-icon">{game.icon}</span></div><div className="card-copy"><span className="player-tag">{game.players}</span><h3>{game.title}</h3><p>{game.description}</p></div><button className="card-start" onClick={() => onOpenGame(game.id)} aria-label={`${game.title}を始める`}>はじめる <span>↗</span></button>
      </article>)}<article className="coming-card"><span className="coming-mark">＋</span><span>COMING SOON</span><p>次のゲームもお楽しみに</p></article></div>
    </section>
    <footer className="home-footer"><span>飲むなら遊べ、飲まないなら飲め！</span><span>IKKI GAMES</span></footer>
  </main>
}
