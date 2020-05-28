//import renderBookList from "./view.js";

// fetch("/api")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     document.getElementById("root").innerHTML = data.message;
//   })
//   .catch((err) => console.error(err));

fetch("/api/books")
  .then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  })
  .then((books) => {
    renderBookList(books); //write
  })
  .catch((err) => console.error(err));

document.getElementById("save-button").addEventListener("click", (e) => {
  let book = {};
  const author = e.target.form.author.value;
  book.author = author;
  const title = e.target.form.title.value;
  book.title = title;
  const available = e.target.form.avail.value;
  book.available = Boolean(available);
  if (e.target.form.year.value) {
    const year = e.target.form.year.value;
    book.year = Number(year);
  }
  if (e.target.form.page.value) {
    const pages = e.target.form.page.value;
    book.pages = Number(pages);
  }
  if (e.target.form.kind.value) {
    const kind = e.target.form.kind.value;
    book.kind = { genre: kind }; //let it be like this
  }
  console.log(book);
  saveBook(book); //write
  e.preventDefault();
});
