const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

require("dotenv").config();

const server = express();
server.use(cors());


// Podemos poner un límite 
server.use(express.json({ limit: "25mb" }));

// Conectarse con la base de datos 
async function getDBConnection() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "AlbaM9",
        database: "fantasybooks",
    });

    //Nos conectamos 
    connection.connect();
    return connection;
}

const serverPort = process.env.PORT
//const serverPort = 4000;
server.listen(serverPort, () => {
    console.log(`Server listening at ${process.env.URL}`);
});

//Leer / listar todas las entradas existentes. GET LISTO
//Insertar una entrada en su entidad principal(crear / añadir un nuevo elemento). POST
//Actualizar una entrada existente. POST
//Eliminar una entrada existente POST


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
        req.body.author_name, // Cambiar de req.body.name a req.body.author_name
        req.body.author_country, // Cambiar de req.body.country a req.body.author_country
        req.body.author_photo, // Cambiar de req.body.photo a req.body.author_photo
        req.body.author_bio // Cambiar de req.body.bio a req.body.author_bio
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




const pathServerPublicReact = './src/public-react';
server.use(express.static(pathServerPublicReact));

const pathServerPublicStyles = './src/public-css';
server.use(express.static(pathServerPublicStyles));

const pathServerPublicImages = './public';
server.use(express.static(pathServerPublicImages));

