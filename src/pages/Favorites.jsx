import { useMemo } from 'react'
import Pokemon from '../components/Pokemon'
import '../components/PokemonList.css'

function Favorites() {
  const favorites = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]')
    } catch {
      return []
    }
  }, [])

  return (
    <div className="pokemon-list">
      <h1 className="pokemon-list__title">Favorieten</h1>
      {favorites.length === 0 ? (
        <p className="pokemon-list__empty">Nog geen favorieten.</p>
      ) : (
        <ul className="pokemon-list__items">
          {favorites.map((name) => (
            <Pokemon
              key={name}
              name={name}
              url={`https://pokeapi.co/api/v2/pokemon/${name}`}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default Favorites
