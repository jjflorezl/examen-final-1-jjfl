import { NavLink, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import DragonDetail from './pages/DragonDetail'

function App() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 font-semibold transition ${
      isActive ? 'bg-amber-400 text-slate-950' : 'text-white hover:bg-white/10'
    }`

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/95 shadow-lg backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3 text-xl font-extrabold text-white">
            <i className="fa-solid fa-dragon text-amber-400"></i>
            DragonDex
          </NavLink>

          <div className="flex items-center gap-2">
            <NavLink to="/" className={linkClass}>
              Inicio
            </NavLink>
            <NavLink to="/favorites" className={linkClass}>
              Favoritos
            </NavLink>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/dragon/:name" element={<DragonDetail />} />
        <Route
          path="*"
          element={
            <main className="mx-auto max-w-4xl px-4 py-16 text-center">
              <h1 className="text-4xl font-extrabold">Página no encontrada</h1>
              <NavLink to="/" className="mt-6 inline-block rounded-full bg-amber-400 px-6 py-3 font-bold text-slate-950">
                Volver al inicio
              </NavLink>
            </main>
          }
        />
      </Routes>
    </div>
  )
}

export default App
