import { useMemo } from 'react'
import Pokemon from '../components/Pokemon'
import '../components/PokemonList.css'

function Teams() {
  const team = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('team') || '[]')
    } catch {
      return []
    }
  }, [])

  return (
    <div className="pokemon-list">
      <h1 className="pokemon-list__title">Teams</h1>
      {team.length === 0 ? (
        <p className="pokemon-list__empty">
          Nog geen Pokémon in je team. Voeg er een toe via de detailpagina.
        </p>
      ) : (
        <ul className="pokemon-list__items">
          {team.map((name) => (
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

export default Teams
