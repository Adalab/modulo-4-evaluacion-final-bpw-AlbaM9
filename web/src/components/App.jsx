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
        <button>Añade tus libros favoritos!</button>

      </header>

      <ul>
        {libraryData.map((item) => (
          <li key={item.book_id} className='libraryCard'>

            <div className='libraryCard_bookData' style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.6)), url(${item.book_image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: "cover",
              backgroundPosition: "top"
            }}>
              <img src={item.book_image} alt={item.book_title} />
              <div >
                <h3>{item.book_title}</h3>
                <p>Año: {item.book_year}</p>
                <p>Sinopsis: {item.book_synopsis}</p>
              </div>

              <div className='libraryCard_authorData' style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.8)), url(${item.author_photo})` }}>
                <img src={item.author_photo} alt={item.author_name} />
                <div>
                  <p>{item.author_name}</p>
                  <p>{item.author_country}</p>
                  <p className='bio'>{item.author_bio}</p>
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
