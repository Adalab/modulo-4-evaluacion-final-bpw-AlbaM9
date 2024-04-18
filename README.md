# API de Gestión de Libros de Fantasía

Esta es una API RESTful para gestionar libros de fantasía y sus autores.

Por supuesto, aquí tienes el contenido llenado con los detalles de tu API:

### Documentación de la API

#### Descripción
Esta API proporciona funcionalidades para gestionar libros de fantasía y sus autores. Permite realizar operaciones como obtener información de los libros, agregar nuevos libros, actualizar la información de los libros existentes y eliminar libros de la base de datos.

#### Endpoints
- `GET /library`: Obtiene todos los libros de fantasía y su información de autor.
- `POST /library`: Añade un nuevo libro de fantasía junto con la información de su autor.
- `POST /book/:id`: Actualiza ciertos campos de un libro existente y/o de su autor.
- `DELETE /book/:id`: Elimina un libro de fantasía y su autor si no tiene otros libros asociados.

#### Parámetros de solicitud
Para los endpoints `POST /library` y `POST /book/:id`, se deben proporcionar los siguientes parámetros en el cuerpo de la solicitud:

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
```

#### Respuestas
La API devuelve las siguientes respuestas según el éxito de la operación:

- `200 OK`: La solicitud se completó correctamente.
- `201 Created`: Se creó un nuevo recurso.
- `400 Bad Request`: La solicitud fue incorrecta o no válida.
- `404 Not Found`: El recurso solicitado no se encontró.
- `500 Internal Server Error`: Error interno del servidor.

### Instrucciones del Proyecto

#### Configuración del Entorno
Para configurar el entorno de desarrollo, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar las dependencias.
3. Crea una base de datos MySQL llamada `fantasybooks` y ejecuta el script de creación de tablas proporcionado.
4. Crea un archivo `.env` con las siguientes variables de entorno:

```dotenv
PORT=tu_puerto
URL=http://localhost:tu_puerto
```

#### Instalación
Sigue estos pasos para instalar y ejecutar el servidor:

1. Ejecuta `npm start` para iniciar el servidor.

#### Uso
Una vez que el servidor esté en funcionamiento, puedes utilizar la API para gestionar la biblioteca de libros de fantasía.

#### Contribución
Si deseas contribuir al proyecto, sigue estas pautas:

- Haz un fork del repositorio.
- Crea una nueva rama para tu función o corrección de errores.
- Realiza tus cambios y crea una solicitud de extracción (pull request) describiendo tus cambios.

#### Licencia
Este proyecto está bajo la licencia MIT.
