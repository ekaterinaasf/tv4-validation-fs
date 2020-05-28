const saveBook = (book) => {
  fetch("/api/books", {
    method: "POST",
    body: JSON.stringify(book),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((bookList) => {
      renderBookList(bookList); //write
      alert("New book is saved on the server");
    })
    .catch((err) => {
      alert("Unable to save a book");
      console.error(err);
    });
};

const fetchAndLoadBook = (id, el) =>
  fetch("/api/books/" + encodeURIComponent(id))
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((data) => {
      console.log(el);
      console.log(el.parentElement);
      let text = ``;
      if (data.year) {
        const year = data.year;
        text += `The year of publishing is ${year}.`;
      }
      if (data.pages) {
        const pages = data.pages;
        text += `This book has ${pages} pages.`;
      }
      if (data.kind) {
        const kind = data.kind.genre; //let it be like this
        text += `This book belongs to the genre ${kind}.`;
      }
      if (!data.kind || !data.year || !data.pages) {
        return;
      }
      console.log(text);
      var span = document.createElement("span");
      var br = document.createElement("br");
      el.parentElement.lastElementChild.after(br);
      el.parentElement.lastElementChild.after(span, text);
    })
    .catch((err) => console.error(err));

const deleteBook = (id) => {
  fetch("/api/books/" + encodeURIComponent(id), {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res.json();
    })
    .then((list) => {
      renderBookList(list); //write
      alert("Book is deleted");
    })
    .catch((err) => {
      alert("Unable to delete the book");
      console.error(err);
    });
};
