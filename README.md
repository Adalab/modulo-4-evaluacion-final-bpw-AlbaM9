# API de Gestión de Libros de Fantasía

Esta es una API RESTful para gestionar libros de fantasía y sus autores.

### Instrucciones del Proyecto

#### Configuración del Entorno
Para configurar el entorno de desarrollo, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar las dependencias.
3. Instala todas las dependencias necesarias; express, cors, mysql2 y dotenv con el mismo comando
4. Crea una base de datos MySQL llamada `fantasybooks` y ejecuta el script de creación de tablas proporcionado.
4. Crea un archivo `.env` con las siguientes variables de entorno, tammbién las tienes en .env_example:

```dotenv
PORT = write your own port
URL =write your own URL

//database variables;

DB_HOST= your host
DB_USER= your user
DB_PASSWORD=your password
DB_DATABASE=fantasybooks

```

#### Instalación
Sigue estos pasos para instalar y ejecutar el servidor:

3. Ejecuta`npm run dev` para arrancar el servidor
4. Puedes ver la web abriendo en el navegador tu puerto del servidor


#### Uso
Una vez que el servidor esté en funcionamiento, puedes utilizar la API para gestionar la biblioteca de libros de fantasía. También puedes ver una pequeña web que renderiza el contenido de la base de datos, en este caso, la librería.
Recuerda que para realizar CRUD en la base de datos tienes que usar POSTMAN o tu propio frontEnd ya que este proyecto solo contiene una vista del listado.


#### Licencia
Este proyecto está bajo la licencia MIT.

### Puedes consultar la documentacion de la API en 
http:localhost:yourPort/api-docs
