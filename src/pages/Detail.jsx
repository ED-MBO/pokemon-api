import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Detail.css'

const STAT_LABELS = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  speed: 'Speed',
}

function getList(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    return []
  }
}

function Detail() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [description, setDescription] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const [inTeam, setInTeam] = useState(false)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data)
        setIsFavorite(getList('favorites').includes(data.name))
        setInTeam(getList('team').includes(data.name))

        return fetch(data.species.url)
      })
      .then((res) => res.json())
      .then((species) => {
        const entry =
          species.flavor_text_entries.find((item) => item.language.name === 'nl') ||
          species.flavor_text_entries.find((item) => item.language.name === 'en')

        setDescription(
          entry
            ? entry.flavor_text.replace(/\f|\n|\r/g, ' ')
            : 'Geen beschrijving beschikbaar.',
        )
      })
  }, [id])

  function toggleFavorite() {
    if (!pokemon) return
    const current = getList('favorites')
    const next = current.includes(pokemon.name)
      ? current.filter((name) => name !== pokemon.name)
      : [...current, pokemon.name]
    localStorage.setItem('favorites', JSON.stringify(next))
    setIsFavorite(next.includes(pokemon.name))
  }

  function addToTeam() {
    if (!pokemon) return
    const current = getList('team')
    if (current.includes(pokemon.name)) return
    if (current.length >= 6) {
      alert('Een team mag maximaal 6 Pokémon hebben.')
      return
    }
    const next = [...current, pokemon.name]
    localStorage.setItem('team', JSON.stringify(next))
    setInTeam(true)
  }

  if (!pokemon) {
    return <p>Laden...</p>
  }

  const typeName = pokemon.types[0].type.name
  const typeLabel = typeName.charAt(0).toUpperCase() + typeName.slice(1)
  const paddedId = String(pokemon.id).padStart(3, '0')
  const stats = pokemon.stats.filter((stat) =>
    Object.keys(STAT_LABELS).includes(stat.stat.name),
  )

  return (
    <div className="detail">
      <Link to="/list" className="detail__back">
        ← Terug
      </Link>

      <div className="detail__layout">
        <div className="detail__image-box">
          <img
            src={
              pokemon.sprites.front_default
            }
            alt={pokemon.name}
          />
        </div>

        <div className="detail__info">
          <h1 className="detail__name">{pokemon.name}</h1>
          <p className="detail__meta">
            {typeLabel} • #{paddedId}
          </p>

          <div className="detail__stats">
            {stats.map((stat) => (
              <div key={stat.stat.name} className="detail__stat">
                <span className="detail__stat-label">
                  {STAT_LABELS[stat.stat.name]}
                </span>
                <div className="detail__stat-bar">
                  <div
                    className="detail__stat-fill"
                    style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="detail__description">{description}</p>

          <div className="detail__actions">
            <button
              type="button"
              className="detail__btn detail__btn--primary"
              onClick={addToTeam}
              disabled={inTeam}
            >
              {inTeam ? 'Al in team' : 'Toevoegen aan team'}
            </button>
            <button
              type="button"
              className="detail__btn detail__btn--secondary"
              onClick={toggleFavorite}
            >
              {isFavorite
                ? 'Verwijderen uit favorieten'
                : 'Toevoegen aan favorieten'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
