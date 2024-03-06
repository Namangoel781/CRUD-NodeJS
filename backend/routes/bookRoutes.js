const express = require("express")
const Book = require("../models/bookModel")
const router = express.Router()


// Get all Books
router.get("/", async (req, res) => {
    try {
      const books = await Book.find({});
  
      return res.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
//   Get by Id
router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const book = await Book.findById(id);
  
      return res.status(200).json({ book });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

//  Create Book
router.post("/", async (req, res) => {
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
  
//   update Book
router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }
      const { id } = req.params;
  
      const result = await Book.findByIdAndUpdate(id, req.body);
  
      if (!result) {
        return res.status(404).json({ message: "Book not founds" });
      }
  
      return res.status(200).send({ message: "Book update successfully" });
  
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
//   Delete book
router.delete("/:id", async (req, res) => {
      try {
        
        const { id } = req.params;
    
        const result = await Book.findByIdAndDelete(id);
    
        if (!result) {
          return res.status(404).json({ message: "Book not founds" });
        }
    
        return res.status(200).send({ message: "Book deleted successfully" });
    
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
      }
    });

module.exports = router