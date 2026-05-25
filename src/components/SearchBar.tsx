import { useState } from 'react'

type SearchBarProps = {
  onSearch: (value: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchText, setSearchText] = useState('')

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setSearchText(value)
    onSearch(value)
  }

  return (
    <div className="relative mx-auto mb-8 max-w-xl">
      <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Buscar dragón por nombre..."
        className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 text-slate-800 shadow outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
      />
    </div>
  )
}
