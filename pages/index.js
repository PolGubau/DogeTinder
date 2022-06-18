import { useEffect, useState } from "react"
import React from "react"
export default function App() {
  const [allDopes, setAllDopes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (isLoading) {
      async function fetchData() {
        try {
          const response = await fetch("http://shibe.online/api/shibes")
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
        <img
          className="DogeFoto"
          src={imageUrl}
          alt="Imagen de perrito aleatoria"
        />
        <div className="slider">
          <button className="no" onClick={() => randomDog()}>
            Nope
          </button>
          <button className="yes" onClick={() => yes()}>
            Dope
          </button>
          <div className="historial">
            {allDopes.map((imgSrc, index) => (
              <a href={imgSrc}>
                <img
                  className="candidato"
                  src={imgSrc}
                  key={index}
                  alt="Tus antiguos candidatos"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .App {
          overflow: hidden;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        .historial {
          display: flex;
          flex-direction: row;
        }
        .DogeFoto {
          height: 90vh;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .candidato {
          height: 9vh;
          z-index: 2;
        }
        .slider {
          position: absolute;
          margin-left: auto;
          margin-right: auto;
          left: 0;
          right: 0;
          text-align: center;
          top: 80vh;
          width: 100%;
        }
        button {
          font-size: 1.5rem;
          width: 10vw;
          height: 7vh;
          border-radius: 15px;
          margin: 5px;
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
