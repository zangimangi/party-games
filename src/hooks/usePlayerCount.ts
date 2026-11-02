import { useEffect, useState } from 'react'

const STORAGE_KEY = 'party-games-player-count'
const validCount = (value: unknown): value is number => typeof value === 'number' && Number.isInteger(value) && value >= 2 && value <= 20

export function usePlayerCount() {
  const [playerCount, setPlayerCount] = useState<number>(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_KEY))
      return validCount(saved) ? saved : 4
    } catch { return 4 }
  })

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, String(playerCount)) } catch { /* storage may be unavailable */ }
  }, [playerCount])

  return [playerCount, setPlayerCount] as const
}
