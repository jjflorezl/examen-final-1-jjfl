import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import type { Dragon } from '../services/DragonService'

type DragonCardProps = {
  dragon: Dragon
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export default function DragonCard({ dragon }: DragonCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(dragon.name)

  function handleFavoriteClick() {
    if (favorite) {
      removeFavorite(dragon.name)
    } else {
      addFavorite(dragon)
    }
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="bg-gradient-to-br from-amber-100 via-orange-100 to-red-100 p-6">
        <img
          src={dragon.image}
          alt={`Imagen de ${dragon.name}`}
          className="mx-auto h-44 w-44 object-contain transition group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <Link
              to={`/dragon/${dragon.name}`}
              className="text-2xl font-bold capitalize text-slate-900 hover:text-red-600"
            >
              {dragon.name}
            </Link>
            <p className="mt-1 text-sm text-slate-500">Poder: {dragon.powerLevel}</p>
          </div>

          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            className="rounded-full bg-slate-100 p-3 text-xl transition hover:bg-red-50"
          >
            <i className={`${favorite ? 'fa-solid text-red-500' : 'fa-regular text-slate-400'} fa-heart`}></i>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {dragon.types.map((type) => (
            <span
              key={type}
              className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
            >
              {capitalize(type)}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
