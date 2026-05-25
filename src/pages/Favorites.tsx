import { useFavorites } from '../context/FavoritesContext'
import DragonList from '../components/DragonList'
import EmptyState from '../components/EmptyState'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-3xl bg-slate-950 px-6 py-10 text-center text-white shadow-xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-red-300">Favoritos</p>
        <h1 className="text-4xl font-extrabold">Mis dragones favoritos</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Aquí aparecen los dragones que guardaste desde el catálogo o desde el detalle.
        </p>
      </section>

      {favorites.length === 0 ? (
        <EmptyState message="No tienes favoritos aún." />
      ) : (
        <DragonList dragons={favorites} />
      )}
    </main>
  )
}
