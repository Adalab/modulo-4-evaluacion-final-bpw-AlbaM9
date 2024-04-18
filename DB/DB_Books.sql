create Database FantasyBooks;
use FantasyBooks;
CREATE TABLE authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(100),
    author_country VARCHAR(100),
    author_photo LONGTEXT,
    author_bio TEXT
);
CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    book_title VARCHAR(255),
    book_image LONGTEXT,
    book_synopsis TEXT,
    book_year YEAR,
	fk_author_id INT,
    FOREIGN KEY (fk_author_id) REFERENCES authors(author_id)
);

INSERT INTO authors (author_name, author_country, author_photo, author_bio) VALUES
('Patrick Rothfuss', 'Estados Unidos', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQyFZ5HeQJaoZ8bdN4kfcrJGryBv368Y0S8p4t6VbYFGz38vLm1', 'Patrick James Rothfuss (Madison, 6 de junio de 1973) es un escritor estadounidense de fantasía y profesor adjunto de literatura y filología inglesa de la Universidad de Wisconsin. Es el autor de la serie Crónica del asesino de reyes, que fue rechazada por varias editoriales antes de que el primer libro de la serie El nombre del viento fuese publicado en el año 2007. Obtuvo muy buenas críticas y se convirtió en un éxito de ventas.'),
('Cassandra Clare', 'Estados Unidos', 'https://www.dymocks.com.au/getmedia/bb24d82c-b16b-4b01-85f4-451be21147a6/cassandra-clare.jpg.aspx?width=400&height=412&ext=.jpg', 'Judith Rumelt (Teherán, Irán; 27 de julio de 1973), que escribe con el seudónimo Cassandra Clare, es una escritora estadounidense conocida principalmente por ser de la autora de la serie de libros de Cazadores de Sombras.');


INSERT INTO books (book_title, book_image, book_synopsis, book_year, fk_author_id) VALUES
('El Nombre del Viento', 'https://papeltintaycafe.files.wordpress.com/2016/11/el-nombre-del-viento-mobi-epub.jpg?w=2000&h=', 'En una posada en tierra de nadie, un hombre se dispone a relatar, por primera vez, la autentica historia de su vida. Una historia que únicamente el conoce y que ha quedado diluida tras los rumores, las conjeturas y los cuentos de taberna que le han convertido en un personaje legendario a quien todos daban ya por muerto: Kvothe... músico, mendigo, ladrón, estudiante, mago, heroe y asesino.

 
Ahora va a revelar la verdad sobre sí mismo. Y para ello debe empezar por el principio: su infancia en una troupe de artistas itinerantes, los años malviviendo como un ladronzuelo en las calles de una gran ciudad y su llegada a una universidad donde esperaba encontrar todas las respuestas que había estado buscando.', 2007, 1),
('Cazadores de Sombras: Ciudad de Hueso', 'https://imagessl1.casadellibro.com/a/l/s7/01/9788408083801.webp', 'En el Pandemónium, la discoteca de moda de Nuva York, Clary sigue a un atractivo chico de pelo azul hasta que presencia su muerte a manos de tres jóvenes cubiertos de extraños tatuajes.

Desde esa noche, su destino se une al de esos tres cazadores de sombras, guerreros dedicados a liberar a la Tierra de demonios, y sobre todo, al de Jace, un chico con aspecto de ángel y tendencia a actuar como un idiota...', 2007, 2);

