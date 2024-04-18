# API de Gestión de Libros de Fantasía

Esta es una API RESTful para gestionar libros de fantasía y sus autores.

## Endpoints

- `GET /library`: Obtiene todos los libros de fantasía y su información de autor.
- `POST /library`: Añade un nuevo libro de fantasía junto con la información de su autor.
- `POST /book/:id`: Actualiza ciertos campos de un libro existente y/o de su autor.
- `DELETE /book/:id`: Elimina un libro de fantasía y su autor si no tiene otros libros asociados.

## Parámetros de solicitud

### POST /library y POST /book/:id

```json
{
  "book_title": "El Camino de los Reyes",
  "book_image": "https://example.com/book_image.jpg",
  "book_synopsis": "Sinopsis del libro...",
  "book_year": 2010,
  "author_name": "Brandon Sanderson",
  "author_country": "Estados Unidos",
  "author_photo": "https://example.com/author_photo.jpg",
  "author_bio": "Biografía del autor..."
}



### Respuestas

- `200 OK`: La solicitud se completó correctamente.
- `201 Created`: Se creó un nuevo recurso.
- `400 Bad Request`: La solicitud fue incorrecta o no válida.
- `404 Not Found`: El recurso solicitado no se encontró.
- `500 Internal Server Error`: Error interno del servidor.

## Configuración del servidor

Este servidor utiliza Express.js para el enrutamiento y MySQL para la base de datos. Asegúrate de configurar las variables de entorno en un archivo `.env` con los siguientes valores, usando tus propio puerto:

\`PORT=3000
URL=http://localhost:3000\`



## Instrucciones de instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar las dependencias.
3. Crea una base de datos MySQL llamada `fantasybooks` y ejecuta el script de creación de tablas proporcionado.
4. Crea un archivo `.env` con las variables de entorno mencionadas anteriormente.
5. Ejecuta `npm start` para iniciar el servidor.
