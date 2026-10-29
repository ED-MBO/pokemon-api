import { useEffect, useState } from 'react'
import Pokemon from './Pokemon'
import './PokemonList.css'

const FILTERS = ['Alles', 'Fire', 'Water', 'Grass', 'Favoriet']

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem('favorites') || '[]')
  } catch {
    return []
  }
}

function PokemonList() {
  const [pokemons, setPokemons] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('Alles')

  useEffect(() => {
    if (filter === 'Favoriet') {
      const favorites = getFavorites()
      setPokemons(
        favorites.map((name) => ({
          name,
          url: `https://pokeapi.co/api/v2/pokemon/${name}`,
        })),
      )
      return
    }

    if (filter === 'Alles') {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
        .then((res) => res.json())
        .then((data) => setPokemons(data.results))
      return
    }

    fetch(`https://pokeapi.co/api/v2/type/${filter.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        const list = data.pokemon.slice(0, 20).map((entry) => entry.pokemon)
        setPokemons(list)
      })
  }, [filter])

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="pokemon-list">
      <h1 className="pokemon-list__title">Pokémon Lijst</h1>

      <label className="pokemon-list__search">
        <span className="pokemon-list__search-icon" aria-hidden="true">
          ⌕
        </span>
        <input
          type="search"
          placeholder="Zoeken..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      <div className="pokemon-list__filters" role="group" aria-label="Filters">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            className={
              filter === item
                ? 'pokemon-list__chip pokemon-list__chip--active'
                : 'pokemon-list__chip'
            }
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <ul className="pokemon-list__items">
        {filtered.map((p) => (
          <Pokemon key={p.name} url={p.url} name={p.name} />
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="pokemon-list__empty">Geen Pokémon gevonden.</p>
      )}
    </div>
  )
}

export default PokemonList
