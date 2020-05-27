"use strict";

const fs = require("fs");
const path = require("path");
const tv4 = require("tv4");
const util = require("util");
const config = require("../config");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const SPATH = path.join(__dirname, "/..", config.DATA_DIR, "/tv4-schema.json");
const SCHEMA = require(SPATH);
const DATA_PATH = path.join(__dirname, "..", config.DATA_DIR, "/tv4-data.json");

const controllers = {
  hello: (req, res) => {
    res.json({ message: "hello!" });
  },
  getList: async (req, res) => {
    try {
      const bookList = await readFile(DATA_PATH, "utf-8");

      const list = JSON.parse(bookList);
      console.log(list.books);
      res.json(list.books);
    } catch (err) {
      console.log(err);

      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }
      next(err);
    }
  },
  getBook: async (req, res) => {
    const id = Number(req.params.id);
    try {
      const bookList = await readFile(DATA_PATH, "utf-8");

      const list = JSON.parse(bookList);
      const selectedBook = list.books.find((book) => book.id === id);

      res.json(selectedBook);
    } catch (err) {
      console.log(err);

      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }

      next(err);
    }
  },
  addBook: async (req, res) => {
    const newBook = req.body;

    try {
      const bookList = await readFile(DATA_PATH, "utf-8");
      const list = JSON.parse(bookList);

      newBook.id = list.nextId;
      list.nextId++;

      const isValid = tv4.validate(newBook, SCHEMA);

      if (!isValid) {
        const error = tv4.error;
        console.error(error);

        res.status(400).json({
          error: {
            message: error.message,
            dataPath: error.dataPath,
          },
        });
        return;
      }

      list.books.push(newBook);

      const newBookData = JSON.stringify(list, null, "  ");

      await writeFile(DATA_PATH, newBookData);

      res.json(newBook);
    } catch (err) {
      console.log(err);

      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }

      next(err);
    }
  },
  removeBook: async (req, res) => {
    const id = Number(req.params.id);

    try {
      const bookList = await readFile(DATA_PATH, "utf-8");
      const list = JSON.parse(bookList);

      const entryToDelete = list.books.find((book) => book.id === id);

      if (entryToDelete) {
        list.books = list.books.filter((book) => book.id !== entryToDelete.id);

        const newBooksData = JSON.stringify(list, null, "  ");

        await writeFile(DATA_PATH, newBooksData);

        res.json(entryToDelete);
      } else {
        res.json(`no entry with id ${id}`);
      }
    } catch (err) {
      console.log(err);

      if (err && err.code === "ENOENT") {
        res.status(404).end();
        return;
      }

      next(err);
    }
  },
};

module.exports = controllers;
