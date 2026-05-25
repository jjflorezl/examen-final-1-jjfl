import type { Dragon } from '../services/DragonService'
import DragonCard from './DragonCard'

type DragonListProps = {
  dragons: Dragon[]
}

export default function DragonList({ dragons }: DragonListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {dragons.map((dragon) => (
        <DragonCard key={dragon.name} dragon={dragon} />
      ))}
    </div>
  )
}
