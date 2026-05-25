import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchDragonDetail, type Dragon } from '../services/DragonService'
import { useFavorites } from '../context/FavoritesContext'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export default function DragonDetail() {
  const { name } = useParams()
  const [dragon, setDragon] = useState<Dragon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    async function loadDragonDetail() {
      if (!name) {
        setError('No se encontró el nombre del dragón.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const data = await fetchDragonDetail(name)
        setDragon(data)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Ocurrió un error inesperado.')
      } finally {
        setLoading(false)
      }
    }

    loadDragonDetail()
  }, [name])

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Loader />
      </main>
    )
  }

  if (error) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <ErrorMessage message={error} />
      </main>
    )
  }

  if (!dragon) {
    return null
  }

  const favorite = isFavorite(dragon.name)
  const mainStats = dragon.stats.filter((stat) => ['hp', 'attack', 'defense'].includes(stat.name))

  function handleFavoriteClick() {
    if (!dragon) {
      return
    }

    if (favorite) {
      removeFavorite(dragon.name)
    } else {
      addFavorite(dragon)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 font-semibold text-amber-600 hover:text-amber-700">
        <i className="fa-solid fa-arrow-left"></i>
        Volver al catálogo
      </Link>

      <section className="overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="grid gap-8 bg-gradient-to-br from-slate-950 to-slate-800 p-8 text-white md:grid-cols-2 md:items-center">
          <div className="rounded-3xl bg-white/10 p-6">
            <img
              src={dragon.image}
              alt={`Imagen de ${dragon.name}`}
              className="mx-auto h-72 w-72 object-contain"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Dragón #{dragon.id}</p>
            <h1 className="mt-3 text-5xl font-extrabold capitalize">{dragon.name}</h1>
            <p className="mt-4 text-slate-300">{dragon.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {dragon.types.map((type) => (
                <span key={type} className="rounded-full bg-amber-400 px-4 py-2 text-sm font-bold uppercase text-slate-950">
                  {capitalize(type)}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={handleFavoriteClick}
              className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-100"
            >
              <i className={`${favorite ? 'fa-solid text-red-500' : 'fa-regular text-slate-500'} fa-heart text-xl`}></i>
              {favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </button>
          </div>
        </div>

        <div className="grid gap-6 p-8 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">Región</h2>
            <p className="text-xl font-bold text-slate-900">{dragon.region}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">Nivel de poder</h2>
            <p className="text-xl font-bold text-slate-900">{dragon.powerLevel}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">Habilidades</h2>
            <p className="text-xl font-bold capitalize text-slate-900">{dragon.abilities.join(', ')}</p>
          </div>
        </div>

        <div className="border-t border-slate-100 p-8">
          <h2 className="mb-5 text-2xl font-bold text-slate-900">Estadísticas principales</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {mainStats.map((stat) => (
              <div key={stat.name} className="rounded-2xl border border-slate-200 p-5 text-center shadow-sm">
                <p className="text-sm font-semibold uppercase text-slate-500">{capitalize(stat.name)}</p>
                <p className="mt-2 text-4xl font-extrabold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
