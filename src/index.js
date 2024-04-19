const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig');

require("dotenv").config();

const server = express();
server.use(cors());

server.use(express.json({ limit: "25mb" }));


server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


async function getDBConnection() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });

    return connection;
}

const serverPort = process.env.PORT
server.listen(serverPort, () => {
    console.log(`Server listening at ${process.env.URL}`);
});


/**
 * @swagger
 * /library:
 *   get:
 *     summary: Obtiene la biblioteca de libros de fantasía junto con la información de sus autores.
 *     description: Retorna una lista de libros de fantasía con la información de sus autores.
 *     responses:
 *       '200':
 *         description: Lista de libros de fantasía con información de sus autores.
 *       '500':
 *         description: Error interno del servidor al obtener la biblioteca de libros.
 */
server.get("/library", async (req, res) => {

    try {
        const connection = await getDBConnection();
        const sql = "SELECT * FROM books, authors WHERE books.fk_author_id = authors.author_id";
        const [libraryResult] = await connection.query(sql);
        console.log(libraryResult);
        connection.end();

        //Devolvemos la respuesta
        res.status(200).json({

            status: "success",
            message: libraryResult,

        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Ha habido un error interno. Contacte soporte",
        });
    }

});
/**
 * @swagger
 * /library:
 *   post:
 *     summary: Añade un nuevo libro de fantasía junto con la información de su autor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               book_title:
 *                 type: string
 *                 description: El título del libro.
 *               book_image:
 *                 type: string
 *                 description: La URL de la imagen del libro.
 *               book_synopsis:
 *                 type: string
 *                 description: La sinopsis del libro.
 *               book_year:
 *                 type: integer
 *                 description: El año de publicación del libro.
 *               author_name:
 *                 type: string
 *                 description: El nombre del autor del libro.
 *               author_country:
 *                 type: string
 *                 description: El país del autor del libro.
 *               author_photo:
 *                 type: string
 *                 description: La URL de la foto del autor del libro.
 *               author_bio:
 *                 type: string
 *                 description: La biografía del autor del libro.
 *     responses:
 *       '201':
 *         description: Petición exitosa. Se creó un nuevo libro de fantasía junto con la información de su autor.
 *       '400':
 *         description: La solicitud fue incorrecta o no válida.
 *       '500':
 *         description: Error interno del servidor al procesar la solicitud.
 */
server.post("/library", async (req, res) => {
    // Para que avise si falta algún campo
    const requiredFields = ['author_name', 'author_country', 'author_photo', 'author_bio', 'book_title', 'book_image', 'book_synopsis', 'book_year'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Faltan campos requeridos: ${missingFields.join(', ')}` });
    }
    try {
        const connection = await getDBConnection();

        const authorQuerySql = "INSERT INTO authors (author_name, author_country, author_photo, author_bio) VALUES (?, ?, ?, ?)";
        const [authorResult] = await connection.query(authorQuerySql, [
            req.body.author_name,
            req.body.author_country,
            req.body.author_photo,
            req.body.author_bio
        ]);

        const projectQuerySql = "INSERT INTO books (book_title, book_image, book_synopsis, book_year, fk_author_id) VALUES (?, ?, ?, ?, ?)";
        const [bookResult] = await connection.query(projectQuerySql, [
            req.body.book_title,
            req.body.book_image,
            req.body.book_synopsis,
            req.body.book_year,
            authorResult.insertId
        ]);

        res.status(201).json({
            success: true,
            id: bookResult.insertId
        });
    } catch (error) {
        console.error("Error al añadir el libro:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
});

/**
 * @swagger
 * /book/{id}:
 *   put:
 *     summary: Actualiza la información de un libro y su autor.
 *     description: Actualiza la información de un libro y su autor identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del libro a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título del libro.
 *               image:
 *                 type: string
 *                 description: La URL de la imagen del libro.
 *               synopsis:
 *                 type: string
 *                 description: La sinopsis del libro.
 *               year:
 *                 type: integer
 *                 description: El año de publicación del libro.
 *               author_name:
 *                 type: string
 *                 description: El nombre del autor del libro.
 *               author_country:
 *                 type: string
 *                 description: El país del autor del libro.
 *               author_photo:
 *                 type: string
 *                 description: La URL de la foto del autor del libro.
 *               author_bio:
 *                 type: string
 *                 description: La biografía del autor del libro.
 *     responses:
 *       '200':
 *         description: Los campos del libro y del autor fueron actualizados exitosamente.
 *       '400':
 *         description: No se proporcionaron campos para actualizar o la solicitud fue incorrecta.
 *       '500':
 *         description: Error interno del servidor al actualizar los campos del libro y del autor.
 */
server.put("/book/:id", async (req, res) => {
    const bookId = req.params.id;
    const { book_title, book_image, book_synopsis, book_year, author_name, author_country, author_photo, author_bio } = req.body;

    try {
        const connection = await getDBConnection();
        let updateFieldsBook = [];
        let updateFieldsAuthor = [];
        let valuesBook = [];
        let valuesAuthor = [];

        if (book_title) {
            updateFieldsBook.push("book_title = ?");
            valuesBook.push(book_title);
        }
        if (book_image) {
            updateFieldsBook.push("book_image = ?");
            valuesBook.push(book_image);
        }
        if (book_synopsis) {
            updateFieldsBook.push("book_synopsis = ?");
            valuesBook.push(book_synopsis);
        }
        if (book_year) {
            updateFieldsBook.push("book_year = ?");
            valuesBook.push(book_year);
        }

        if (author_name) {
            updateFieldsAuthor.push("author_name = ?");
            valuesAuthor.push(author_name);
        }
        if (author_country) {
            updateFieldsAuthor.push("author_country = ?");
            valuesAuthor.push(author_country);
        }
        if (author_photo) {
            updateFieldsAuthor.push("author_photo = ?");
            valuesAuthor.push(author_photo);
        }
        if (author_bio) {
            updateFieldsAuthor.push("author_bio = ?");
            valuesAuthor.push(author_bio);
        }

        if (updateFieldsBook.length === 0 && updateFieldsAuthor.length === 0) {
            return res.status(400).json({ error: "No se proporcionaron campos para actualizar." });
        }

        if (updateFieldsBook.length > 0) {
            const updateBookQuery = `UPDATE books SET ${updateFieldsBook.join(", ")} WHERE book_id = ?`;
            valuesBook.push(bookId);
            await connection.query(updateBookQuery, valuesBook);
        }

        if (updateFieldsAuthor.length > 0) {
            const updateAuthorQuery = `UPDATE authors SET ${updateFieldsAuthor.join(", ")} WHERE author_id = (SELECT fk_author_id FROM books WHERE book_id = ?)`;
            valuesAuthor.push(bookId);
            await connection.query(updateAuthorQuery, valuesAuthor);
        }

        res.status(200).json({ success: true, message: "Los campos del libro y del autor fueron actualizados exitosamente." });
    } catch (error) {
        console.error("Error al actualizar los campos del libro y del autor:", error);
        res.status(500).json({ error: "Error interno del servidor al actualizar los campos del libro y del autor." });
    }
});


/**
 * @swagger
 * /book/{id}:
 *   delete:
 *     summary: Elimina un libro y su autor.
 *     description: Elimina un libro y su autor identificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del libro a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: La entrada del libro fue eliminada exitosamente.
 *       '404':
 *         description: No se encontró ningún libro con el ID proporcionado.
 *       '500':
 *         description: Error interno del servidor al eliminar la entrada del libro.
 */
server.delete("/book/:id", async (req, res) => {
    const bookId = req.params.id;

    try {
        const connection = await getDBConnection();

        const deleteBookQuery = "DELETE FROM books WHERE book_id = ?";
        const [bookResult] = await connection.query(deleteBookQuery, [bookId]);

        if (bookResult.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró ningún libro con el ID proporcionado." });
        }

        const deleteAuthorQuery = "DELETE FROM authors WHERE author_id NOT IN (SELECT fk_author_id FROM books)";
        await connection.query(deleteAuthorQuery);

        res.status(200).json({ success: true, message: "La entrada del libro fue eliminada exitosamente." });

    } catch (error) {
        console.error("Error al eliminar la entrada del libro:", error);
        res.status(500).json({ error: "Error interno del servidor al eliminar la entrada del libro." });
    }
});


const pathServerPublicReact = './src/public-react';
server.use(express.static(pathServerPublicReact));