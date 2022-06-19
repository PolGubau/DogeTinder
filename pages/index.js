import React, { useEffect, useState } from "react"
export default function App() {
  const [allDopes, setAllDopes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (isLoading) {
      async function fetchData() {
        try {
          const response = await fetch(
            "https://shibe.online/api/shibes?httpsUrls=true"
          )
          if (response.ok) {
            const dog = await response.json()
            setImageUrl(dog)
            setError(null)
            setIsLoading(false)
          } else {
            setError("Hubo un error al obtener el perrito")
          }
        } catch (error) {
          setError("No pudimos hacer la solicitud para obtener el perrito")
        }
      }
      fetchData()
    }
  }, [isLoading])

  const randomDog = () => {
    setIsLoading(true)
  }
  if (isLoading) {
    return (
      <div className="App">
        <p className="loading">Searching new candidate 🐶</p>
      </div>
    )
  }
  if (error) {
    // ⬅️ mostramos el error (si es que existe)
    return (
      <div className="App">
        <h1>{error}</h1>
        <button onClick={randomDog}>Volver a intentarlo</button>
      </div>
    )
  }
  const yes = () => {
    setAllDopes([imageUrl, ...allDopes])
    console.log(allDopes)

    randomDog()
  }
  return (
    <>
      <div className="App">
        <section className="fotoPerro">
          <img
            className="DogeFoto"
            src={imageUrl}
            alt="Imagen de perrito aleatoria"
          />
        </section>
        <div className="slider">
          <button className="no" onClick={() => randomDog()}>
            Nope
          </button>
          <button className="yes" onClick={() => yes()}>
            Dope
          </button>
        </div>
        <h3>Tus candidatos</h3>

        <div className="historial">
          {allDopes.map((imgSrc) => (
            <a key={imgSrc} href={imgSrc}>
              <img
                className="candidato"
                src={imgSrc}
                alt="Tus antiguos candidatos"
              />
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .App {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .historial {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100vw;
          align-content: center;
          justify-content: flex-start;
          align-items: flex-start;
          margin-bottom: 7vh;
        }
        .fotoPerro {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .DogeFoto {
          width: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .candidato {
          background-position: center;
          background-size: cover;
          height: 9vh;
          z-index: 2;
        }
        .slider {
          position: fixed;
          width: 100%;
          display: flex;
          justify-items: center;
          justify-content: center;
          align-content: center;
          flex-wrap: wrap;
          flex-direction: row;
          align-items: center;
          bottom: 0;
        }
        button {
          font-size: 1.5rem;
          min-width: 50vw;
          height: 7vh;
          border: none;
          outline: none;
        }
        .yes {
          background-color: #aaffaa;
        }
        .no {
          background-color: #ffaaaa;
        }
      `}</style>
    </>
  )
}
