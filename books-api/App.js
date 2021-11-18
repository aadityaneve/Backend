/* 
    Problem
    go to https://www.mockaroo.com/ and download a sample books json which has following fields
    author
    book name
    pages
    published year and download a json of 100 items
    Create an Express application which handles below apis
    get '/' this will return all the users
    post '/books' - pass an user to it and it will append it to the end of the users and return it
    get '/books/:id' - this will return user with a specific id



    patch '/books/:id' - pass a different author and published year only and update those on the book that matched the id
    delete '/books:id' - delete the book that matched the id
    Add a middleware that adds
    { api_requested_by: "Your Name"} // so sample would be { api_requested_by: "Dhaval Chheda"} in your response

    Note :-
    when you are returning an array it should be outside the array for e.g :- { "api_requested_by": "Dhaval Chheda", "books": [] // this is your books array }
    for single book returned it should be like { "api_requested_by": "Dhaval Chheda", "book": {} // this will have your book }
*/

const books = require("./books-data.json");

const express = require("express");
const app = express();

app.use(express.json());

// It will return all books
app.get("/", (req, res) => {
    res.send({ books });
});

// It will add a book at last of the list
app.post("/books", (req, res) => {
    const newBooks = [...books, req.body];
    res.send(newBooks);
});

// This will return a specific book
app.get("/books/:id", (req, res) => {
    const book = books.filter((book) => {
        if (parseInt(book.id) === parseInt(req.params.id)) {
            return book;
        }
    });
    res.json(book);
});

// It will update author and published year only
app.patch("/books/:id", (req, res) => {
    const updatedBooks = books.map((book) => {
        if (parseInt(req.params.id) === parseInt(book.id)) {
            if (req?.body?.author) book.author = req.body.author;
            if (req?.body?.published_year)
                book.published_year = req.body.published_year;
        }
        return book;
    });
    res.json(updatedBooks);
});

// It will delete the book
app.delete("/books/:id", (req, res) => {
    const updatedBooks = books.filter((book) => {
        if (parseInt(req.params.id) !== parseInt(book.id)) {
            return book;
        }
    });
    res.json(updatedBooks);
});

app.listen(3001, (req, res) => {
    console.log("Listening to PORT 3001");
});
