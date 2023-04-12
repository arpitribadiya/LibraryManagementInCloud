const express = require("express");
const librarian_router = express.Router();

const librarian_controller = require('../controller/LibrarianController');


librarian_router.get('/', librarian_controller.get_librarian_list);
librarian_router.post('/loginLibrarian', librarian_controller.post_librarian_login);
librarian_router.post('/registerLibrarian', librarian_controller.post_librarian_register);
librarian_router.get('/getBooks', librarian_controller.get_book_list);
librarian_router.post('/addBook', librarian_controller.post_book_add);


module.exports = librarian_router;