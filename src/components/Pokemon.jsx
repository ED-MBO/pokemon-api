import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Pokemon.css'

function Pokemon({ url, name }) {
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
  }, [url])

  if (!pokemon) {
    return (
      <li className="pokemon-row pokemon-row--loading">
        <div className="pokemon-row__thumb" />
        <span>{name}</span>
      </li>
    )
  }

  const typeName = pokemon.types[0].type.name
  const id = String(pokemon.id).padStart(3, '0')
  const label = typeName.charAt(0).toUpperCase() + typeName.slice(1)

  return (
    <li>
      <Link to={`/detail/${pokemon.name}`} className="pokemon-row">
        <img
          className="pokemon-row__thumb"
          src={pokemon.sprites.front_default}
          alt=""
        />
        <span className="pokemon-row__name">{pokemon.name}</span>
        <span className="pokemon-row__meta">
          {label} #{id}
        </span>
      </Link>
    </li>
  )
}

export default Pokemon
