const renderBookList = (books) => {
  const list = books
    .map((book) => {
      const loadButton = document.createElement("button");
      loadButton.innerHTML = "More";
      loadButton.onclick = () => fetchAndLoadBook(book.id, loadButton); //write GET ID

      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "X";
      deleteButton.onclick = () => deleteBook(book.id); //write

      const li = document.createElement("li");
      li.innerHTML = book.author + ", " + book.title + ", " + book.available;
      li.appendChild(loadButton);
      li.appendChild(deleteButton);

      return li;
    })
    .reduce((all, next) => {
      all.appendChild(next);
      return all;
    });
  //}, document.createElement("ul"));

  const container = document.getElementById("books");
  container.innerHTML = "";
  container.appendChild(list);
};

// const loadFileToEditor = (name, text) => {
//   document.getElementById("file-name").value = name;
//   document.getElementById("file-text").value = text;
// };
