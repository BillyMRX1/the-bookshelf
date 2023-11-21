import {
  saveBooks,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} from "../handlers/books-handler.js";

const booksRoutes = [
  {
    method: "POST",
    path: "/books",
    handler: saveBooks,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBookById,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookById,
  },
];

export default booksRoutes;
