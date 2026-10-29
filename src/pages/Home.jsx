import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function getList(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    return []
  }
}

function Home() {
  const [team, setTeam] = useState([])
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const teamNames = getList('team')
    const favoriteNames = getList('favorites').slice(0, 3)

    Promise.all(
      teamNames.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .then((res) => res.json())
          .then((data) => ({
            name: data.name,
            image: data.sprites.front_default,
          })),
      ),
    ).then(setTeam)

    Promise.all(
      favoriteNames.map((name) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
          .then((res) => res.json())
          .then((data) => ({
            name: data.name,
            id: String(data.id).padStart(3, '0'),
            image: data.sprites.front_default,
          })),
      ),
    ).then(setFavorites)
  }, [])

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__title">Pokemon Team Manager</h1>
        <p className="home__subtitle">
          Beheer je teams, ontdek nieuwe Pokémon en bewaar je favorieten.
        </p>
        <div className="home__actions">
          <Link to="/teams" className="home__btn">
            Nieuw team
          </Link>
          <Link to="/list" className="home__btn">
            Zoek Pokémon
          </Link>
        </div>
      </section>

      <section className="home__section">
        <h2 className="home__heading">Mijn Teams</h2>
        <div className="home__teams">
          <Link to="/teams" className="home__team-card">
            <h3 className="home__team-name">Mijn Team</h3>
            <p className="home__team-count">{team.length}/6 Pokémon</p>
            <div className="home__team-sprites">
              {team.slice(0, 3).map((pokemon) => (
                <img
                  key={pokemon.name}
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="home__sprite"
                />
              ))}
              {team.length === 0 && (
                <>
                  <span className="home__sprite home__sprite--empty" />
                  <span className="home__sprite home__sprite--empty" />
                  <span className="home__sprite home__sprite--empty" />
                </>
              )}
            </div>
          </Link>
        </div>
      </section>

      <section className="home__section">
        <h2 className="home__heading">Favorieten</h2>
        {favorites.length === 0 ? (
          <p className="home__empty">
            Nog geen favorieten.{' '}
            <Link to="/list">Zoek een Pokémon</Link>
          </p>
        ) : (
          <ul className="home__favorites">
            {favorites.map((pokemon) => (
              <li key={pokemon.name}>
                <Link
                  to={`/detail/${pokemon.name}`}
                  className="home__favorite-row"
                >
                  <img
                    src={pokemon.image}
                    alt=""
                    className="home__sprite"
                  />
                  <span className="home__favorite-name">{pokemon.name}</span>
                  <span className="home__favorite-id">#{pokemon.id}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Home
