import React, { useState, useEffect } from 'react';
import '../scss/App.scss';

function App() {
  const [libraryData, setLibraryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:4001/library');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la biblioteca');
        }
        const data = await response.json();
        setLibraryData(data.message);
        console.log(libraryData);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div >
      <header>
        <h2>Librería</h2>

      </header>

      <ul>
        {libraryData.map((item) => (
          <li key={item.id} className='libraryCard'>

            <div className='libraryCard_bookData' style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.8)), url(${item.libro_img})` }}>
              <img src={item.libro_img} alt={item.titulo} />
              <div >
                <h3>{item.titulo}</h3>
                <p>Género: {item.genero}</p>
                <p>Editorial: {item.editorial}</p>
                <p>Año: {item.año_publicacion}</p>
                <p>Sinopsis: {item.sinopsis}</p>
              </div>

              <div className='libraryCard_authorData' style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.8)), url(${item.autor_foto})` }}>
                <img src={item.autor_foto} alt={item.nombre} />
                <div>
                  <p>{item.nombre}</p>
                  <p>{item.nacionalidad}</p>
                  <p className='bio'>{item.biografia}</p>
                </div>
              </div>
            </div>



          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
