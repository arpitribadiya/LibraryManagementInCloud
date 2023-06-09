const path = require("path");
const AWS = require('aws-sdk');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });


const librarianusers  = [
    {
      "username" : "lib1@gmail.com",
      "password" : "Lib1",
      "id" : "1"
    },
    {
      "username" : "Lib2@xyz.ca",
      "password": "Lib2",
      "id" : "2"
  }
  ]


  const books  = [
    {
      "bookName" : "Martin",
      "category" : "general",
      "edition" : "first",
      "id": 1
    },
    {
      "bookName" : "Indian Science",
      "category" : "science",
      "edition" : "second",
      "id": 2
    }
  ]

  
  
exports.get_librarian_list = async (request, response) => {
  try {
    return response.status(200).json({
      message: "Librarian Retrived",
      librarians: librarianusers,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.post_librarian_login = async (request, response) => {
  try {
    const userIndex = librarianusers.findIndex(currUser => currUser.username.toString() === request.body.username.toString() &&  currUser.password.toString() === request.body.password.toString());

    if (userIndex !== -1) {
      return response.json({
            message: "login success!!!",
            success: true,
        })
      } else {
        return response.status(404).send(`User not found.`);
      }
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.post_librarian_register = async (request, response) => {
  try {
      const newLibrarian = request.body;
      const newLibrarianPosition = librarianusers.length + 1;
      newLibrarian.id = newLibrarianPosition;
      librarianusers.push(newLibrarian);
      return response.json({
          message: "Librarian added",
          success: true,
      })
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};


exports.get_book_list = async (request, response) => {
  try {
    return response.status(200).json({
      message: "Books Retrived",
      books: books,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.post_book_add = async (request, response) => {
    try {
        const newBook = request.body;
        const newBookPosition = books.length + 1;
        newBook.id = newBookPosition;
        books.push(newBook);

        const awsconfig = {
            accessKeyId: '',
            secretAccessKey: '',
            region: 'us-east-1'
          }

        console.log(process.env.Admin_Email_ID)
        const params = {
          Source: process.env.Admin_Email_ID,
          Destination: {
            ToAddresses: [process.env.Admin_Email_ID]
          },
          Message: {
            Subject: {
              Charset: "UTF-8",
              Data: 'Book Availalble'
            },
            Body: {
              Html: {
                Charset: "UTF-8",
                Data: `<h1>Book Name : ${newBook.bookName}</h1>`
              }
            }
          }
        }
        const SES = new AWS.SES(awsconfig);
        const emailSent = await SES.sendEmail(params).promise();

        console.log("email sent successfully");

        return response.status(200).json({
          message: "Book added",
          books: books,
        });
        
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        message: "Internal Server Error",
      });
    }
  };