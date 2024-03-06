const mongoose = require("mongoose");
const express = require("express");
const { connectToMongoDB } = require("./config.js");
const Book = require("./models/bookModel.js");
const bookRoutes = require("./routes/bookRoutes.js")
const cors = require("cors")

const PORT = 5555;
const app = express();

app.use(express.json());
app.use(cors())
// Middleware
// app.use(cors({
//   origin: 'http://localhost:3000',
//   method: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type']
// }))

app.get("/", (res, req) => {
  console.log(req);
  return response.status(234).send("Welcome to MERN");
});

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.use('/books', bookRoutes)

mongoose;
connectToMongoDB("mongodb://127.0.0.1:27017/books")
  .then(() => {
    console.log("Mongodb connected");
    app.listen(PORT, () => {
      console.log(`Server start at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
