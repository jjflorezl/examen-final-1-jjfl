export type DragonStat = {
  name: string
  value: number
}

export type Dragon = {
  id: number
  name: string
  image: string
  types: string[]
  region: string
  powerLevel: number
  description: string
  stats: DragonStat[]
  abilities: string[]
}

type PokemonListItem = {
  name: string
  url: string
}

type PokemonDetail = {
  id: number
  name: string
  sprites: {
    other?: {
      ['official-artwork']?: {
        front_default?: string
      }
    }
    front_default?: string
  }
  types: Array<{ type: { name: string } }>
  stats: Array<{ base_stat: number; stat: { name: string } }>
  abilities: Array<{ ability: { name: string } }>
}

const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=30'

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function getRegion(id: number) {
  const regions = ['Volcanes del Este', 'Montañas de Hielo', 'Bosque Antiguo', 'Islas del Trueno', 'Reino Sombrío']
  return regions[id % regions.length]
}

function formatDragon(data: PokemonDetail): Dragon {
  const stats = data.stats.map((item) => ({
    name: item.stat.name,
    value: item.base_stat,
  }))

  const powerLevel = stats.reduce((total, stat) => total + stat.value, 0)
  const types = data.types.map((item) => item.type.name)
  const abilities = data.abilities.map((item) => item.ability.name)
  const mainType = types[0] ?? 'mystic'

  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites.other?.['official-artwork']?.front_default ||
      data.sprites.front_default ||
      '',
    types,
    region: getRegion(data.id),
    powerLevel,
    description: `${capitalize(data.name)} es un dragón de tipo ${mainType} con habilidades especiales como ${abilities.join(', ') || 'poder místico'}.`,
    stats,
    abilities,
  }
}

async function getDragonFromUrl(url: string) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('No se pudo cargar la información del dragón.')
  }

  const data: PokemonDetail = await response.json()
  return formatDragon(data)
}

export async function fetchDragons() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('No se pudo cargar el catálogo de dragones.')
  }

  const data: { results: PokemonListItem[] } = await response.json()
  const dragons = await Promise.all(data.results.map((dragon) => getDragonFromUrl(dragon.url)))

  return dragons
}

export async function fetchDragonDetail(name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)

  if (!response.ok) {
    throw new Error('No se pudo cargar el detalle del dragón.')
  }

  const data: PokemonDetail = await response.json()
  return formatDragon(data)
}
