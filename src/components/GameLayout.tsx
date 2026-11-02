import type { ReactNode } from 'react'
import GameHeader from './GameHeader'

type Props = { title: string; playerCount: number; onPlayerCountChange: (count: number) => void; onReset: () => void; children: ReactNode }
export default function GameLayout({ title, playerCount, onPlayerCountChange, onReset, children }: Props) {
  return <main className="game-page"><GameHeader title={title} playerCount={playerCount} onPlayerCountChange={onPlayerCountChange} onReset={onReset} />{children}</main>
}
