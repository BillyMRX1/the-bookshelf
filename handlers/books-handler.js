import { nanoid } from "nanoid";
import { books } from "../data/books.js";

const saveBooks = (req, h) => {
  try {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      return h
        .response({
          status: "success",
          message: "Buku berhasil ditambahkan",
          data: {
            bookId: id,
          },
        })
        .code(201);
    }

    return h
      .response({
        status: "fail",
        message: "Buku gagal ditambahkan",
      })
      .code(500);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

const getAllBooks = (req, h) => {
  try {
    let filteredBooks = [...books];
    const { name, reading, finished } = req.query;

    if (name) {
      const searchQuery = name.toLowerCase();
      filteredBooks = filteredBooks.filter((book) =>
        book.name.toLowerCase().includes(searchQuery)
      );
      console.log(filteredBooks);
    }

    if (reading !== undefined) {
      const isReading = reading === "1";
      filteredBooks = filteredBooks.filter(
        (book) => book.reading === isReading
      );
    }

    if (finished !== undefined) {
      const isFinished = finished === "1";
      filteredBooks = filteredBooks.filter(
        (book) => book.finished === isFinished
      );
    }

    const response = {
      status: "success",
      data: {
        books: filteredBooks.map(({ id, name, publisher }) => ({
          id,
          name,
          publisher,
        })),
      },
    };

    return h.response(response).code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

const getAllFilteredBooks = (req, h) => {
  try {
    let filteredBooks = [...books];
    const { name, reading, finished } = req.query;

    if (name) {
      const searchQuery = name.toLowerCase();
      filteredBooks = filteredBooks.filter(
        (book) => book.name.toLowerCase() === searchQuery
      );
    }

    if (reading !== undefined) {
      const isReading = reading === "1";
      filteredBooks = filteredBooks.filter(
        (book) => book.reading === isReading
      );
    }

    if (finished !== undefined) {
      const isFinished = finished === "1";
      filteredBooks = filteredBooks.filter(
        (book) => book.finished === isFinished
      );
    }

    const response = {
      status: "success",
      data: {
        books: filteredBooks.map(({ id, name, publisher }) => ({
          id,
          name,
          publisher,
        })),
      },
    };

    return h.response(response).code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

const getBookById = (req, h) => {
  try {
    const { bookId } = req.params;

    const book = books.find((book) => book.id === bookId);

    if (!book) {
      return h
        .response({
          status: "fail",
          message: "Buku tidak ditemukan",
        })
        .code(404);
    }

    const response = {
      status: "success",
      data: {
        book: book,
      },
    };

    return h.response(response).code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

const updateBookById = (req, h) => {
  try {
    const { bookId } = req.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    const bookIndex = books.findIndex((b) => b.id === bookId);

    if (bookIndex === -1) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
    }

    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    books[bookIndex] = {
      ...books[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt: new Date().toISOString(),
    };

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

const deleteBookById = (req, h) => {
  try {
    const { bookId } = req.params;

    const bookIndex = books.findIndex((b) => b.id === bookId);

    if (bookIndex === -1) {
      return h
        .response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
    }

    books.splice(bookIndex, 1);

    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

export { saveBooks, getAllBooks, getBookById, updateBookById, deleteBookById };
