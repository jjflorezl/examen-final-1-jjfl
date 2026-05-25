/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Dragon } from '../services/DragonService'

type FavoritesContextValue = {
  favorites: Dragon[]
  addFavorite: (dragon: Dragon) => void
  removeFavorite: (dragonName: string) => void
  isFavorite: (dragonName: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

type FavoritesProviderProps = {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Dragon[]>([])

  function addFavorite(dragon: Dragon) {
    setFavorites((currentFavorites) => {
      const alreadyExists = currentFavorites.some((favorite) => favorite.name === dragon.name)

      if (alreadyExists) {
        return currentFavorites
      }

      return [...currentFavorites, dragon]
    })
  }

  function removeFavorite(dragonName: string) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((dragon) => dragon.name !== dragonName),
    )
  }

  function isFavorite(dragonName: string) {
    return favorites.some((dragon) => dragon.name === dragonName)
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  }

  return context
}
