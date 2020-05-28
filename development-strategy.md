# tv4-validation project

This project is created to execute tv4 validation library for the schema and data. This project is a library there you can add new book with the pre-defined parameters, check existing book(s) and delete unnecessary ones.

## 0. Preparation step: existing code

Invent a project that might cover required properties, prepared a list of valuable requests and item parameters.

## 1. Data and schema creation

We need to create 2 files describing the initial data for our project inside `./data/tv4-data.json` and valid schema with which our data has to comply `./data/tv4-schema.json`

### Schema

This information is stored inside [data branch](https://github.com/ekaterinaasf/tv4-validation-fs/tree/data). Our object might have such properties with the following types: `"id"("number")`, `"author" ("string")`. `"title"("string")`, `"year"("number")`, `"pages"("number")`, `"kind"("object" with two properties "genre"("string") and "category"("string")`, `"available"("boolean")`. The following properties - "id", "author", "title", "availability" - are required, while the others are optional and can be not filled in.

## 2. Backend creation

There are 4 types of requests: GET for an entire list and GET for the specific book, POST for a new book and DELETE to remove one existing book. In order to better structure the project `router` module was used.

### Post a New Book

Calling this route with a body property in the body of your HTTP Request, and a book title, author name at least add a new book entry inside `./data/tv4-schema.json` file. During validation tv4 module verify if provided information in valid for the schema file `./data/tv4-schema.json`.

- method: POST
- path: "/api/books/"
- body: {body: `<book description>`}
- success response: {status: 'ok', books: `<list_of_books_with_this_one>`}
- failure response: {status: 'error', message: 'Could not write page.'}

### Get All Books

Calling this route will return a response with a entire list of books existing in the library.

- method: GET
- path: "/api/books"
- success response: {status:'ok', books: `<list_of_books_with_this_one>`}
- failure response: none

This route use helpful `readFile` function converted via promisify utility to read `./data/tv4-data.json` file with the library content. Afterwards, this list is sent to the frontend.

### Get One Book

Calling this route will return a response with a JSON object describing one specific book defined with its id.

- method: GET
- path: "/api/books/:id"
- success response: {status:'ok', book: `<requested_book>`}
- failure response: (error message)

This route uses `readFile` function and array method `find` to find this book. If book with the specified id does not exist, to server will send the respective answer to the frontend, otherwise JSON object with the book description will be sent.

### Delete a Book

Calling this route will return a renewed list of books without deleted one. If book with the mentioned id does not exist or some errors appeared at any step, error message will be sent to the frontend.

- method: DELETE
- path: "/api/books/"id"
- success response: {status:'ok', books: `<list_of_books_without_this_one>`}
- failure response: (error message)

## 3. Frontend creation

Frontend consists of 5 files: 2 of them are describing the HTML page and related CSS styles, so `./client/index.html` and `./client/index.html`respectively, other 3 files are script, related to the initial state, book list visualization and action part, so `./client/app/init.js`, `./client/app/view.js` and `./client/app/actions.js` respectively.

## 4. Documentation creation: development strategy

Project description with the step by step coding explanation provided in `development-strategy.md` file.
