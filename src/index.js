const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

require("dotenv").config();

const server = express();
server.use(cors());

server.use(express.json({ limit: "25mb" }));


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

server.post("/library", async (req, res) => {
    const connection = await getDBConnection();

    // Insertar datos del autor
    const authorQuerySql = "INSERT INTO authors (author_name, author_country, author_photo, author_bio) VALUES (?, ?, ?, ?)";
    const [authorResult] = await connection.query(authorQuerySql, [
        req.body.author_name,
        req.body.author_country,
        req.body.author_photo,
        req.body.author_bio
    ]);

    // Insertar datos del libro con el ID del autor relacionado
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
        id: bookResult.insertId,
    });
});

server.put("/book/:id", async (req, res) => {
    const bookId = req.params.id;
    const { title, image, synopsis, year, author_name, author_country, author_photo, author_bio } = req.body;

    try {
        const connection = await getDBConnection();
        let updateFieldsBook = [];
        let updateFieldsAuthor = [];
        let valuesBook = [];
        let valuesAuthor = [];

        if (title) {
            updateFieldsBook.push("book_title = ?");
            valuesBook.push(title);
        }
        if (image) {
            updateFieldsBook.push("book_image = ?");
            valuesBook.push(image);
        }
        if (synopsis) {
            updateFieldsBook.push("book_synopsis = ?");
            valuesBook.push(synopsis);
        }
        if (year) {
            updateFieldsBook.push("book_year = ?");
            valuesBook.push(year);
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

        // Solo envía una respuesta al final de la función
        res.status(200).json({ success: true, message: "Los campos del libro y del autor fueron actualizados exitosamente." });
    } catch (error) {
        console.error("Error al actualizar los campos del libro y del autor:", error);
        res.status(500).json({ error: "Error interno del servidor al actualizar los campos del libro y del autor." });
    }
});

server.delete("/book/:id", async (req, res) => {
    const bookId = req.params.id;

    try {
        const connection = await getDBConnection();

        // Eliminar el libro
        const deleteBookQuery = "DELETE FROM books WHERE book_id = ?";
        const [bookResult] = await connection.query(deleteBookQuery, [bookId]);

        // Verificar si se eliminó alguna fila
        if (bookResult.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró ningún libro con el ID proporcionado." });
        }

        // Eliminar el autor si no tiene otros libros asociados
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