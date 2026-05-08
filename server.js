const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Library Management System</title>
        <style>
          :root {
            --bg: #0b1120;
            --surface: rgba(255, 255, 255, 0.08);
            --surface-strong: rgba(255, 255, 255, 0.12);
            --border: rgba(255, 255, 255, 0.14);
            --accent: #6df4ff;
            --accent-dark: #3be6ff;
            --text: #eceff7;
            --muted: #9ca3ae;
            --danger: #ff6b6b;
            --radius: 24px;
          }

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            min-height: 100vh;
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: radial-gradient(circle at top left, rgba(109, 244, 255, 0.12), transparent 22%),
              radial-gradient(circle at bottom right, rgba(87, 84, 255, 0.18), transparent 18%),
              linear-gradient(180deg, #090b14 0%, #0c1224 100%);
            color: var(--text);
          }

          body::before {
            content: "";
            position: fixed;
            inset: 0;
            background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"%3E%3Cg fill="none" stroke="rgba(109,244,255,0.08)" stroke-width="1"%3E%3Cpath d="M0 20h120M0 60h120M0 100h120"/%3E%3Cpath d="M20 0v120M60 0v120M100 0v120"/%3E%3C/g%3E%3C/svg%3E') center/420px 420px repeat;
            pointer-events: none;
            opacity: 0.16;
          }

          .page {
            max-width: 1180px;
            margin: 0 auto;
            padding: 30px 24px 40px;
          }

          header,
          footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            flex-wrap: wrap;
          }

          .brand {
            display: flex;
            align-items: center;
            gap: 14px;
            font-size: 1.1rem;
            font-weight: 700;
            letter-spacing: 0.02em;
          }

          .logo {
            width: 44px;
            height: 44px;
            border-radius: 16px;
            display: grid;
            place-items: center;
            background: linear-gradient(135deg, rgba(109, 244, 255, 0.24), rgba(59, 230, 255, 0.12));
            border: 1px solid rgba(255, 255, 255, 0.15);
          }

          .logo::before {
            content: "📚";
            font-size: 1.05rem;
          }

          .brand-info {
            display: grid;
            gap: 4px;
            text-align: left;
          }

          .brand-info span {
            color: var(--muted);
            font-size: 0.95rem;
          }

          .pill {
            display: inline-flex;
            gap: 8px;
            align-items: center;
            padding: 10px 16px;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.14);
            color: var(--text);
            font-size: 0.95rem;
          }

          .hero {
            display: grid;
            gap: 24px;
            margin: 28px 0 32px;
          }

          .hero h1 {
            margin: 0;
            font-size: clamp(2.4rem, 4vw, 4.4rem);
            line-height: 1.02;
          }

          .hero p {
            margin: 0;
            max-width: 760px;
            color: var(--muted);
            font-size: 1rem;
            line-height: 1.8;
          }

          .dashboard {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 18px;
            margin-bottom: 26px;
          }

          .card {
            border-radius: 28px;
            background: var(--surface);
            border: 1px solid var(--border);
            backdrop-filter: blur(20px);
            box-shadow: 0 24px 70px rgba(0, 0, 0, 0.25);
            padding: 28px;
            transition: transform 0.3s ease, border-color 0.3s ease;
          }

          .card:hover {
            transform: translateY(-6px);
            border-color: rgba(109, 244, 255, 0.32);
          }

          .card h2 {
            margin: 0 0 12px;
            font-size: 1rem;
            color: #e6f9ff;
          }

          .metric {
            margin: 0;
            font-size: clamp(2rem, 3vw, 3.25rem);
            font-weight: 800;
            color: var(--accent);
          }

          .metric small {
            display: block;
            margin-top: 10px;
            font-size: 0.95rem;
            color: var(--muted);
          }

          .grid-layout {
            display: grid;
            grid-template-columns: 1.05fr 1.45fr;
            gap: 22px;
          }

          .glass-panel {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
          }

          .panel-header h2 {
            margin: 0;
            font-size: 1.05rem;
          }

          .status {
            padding: 10px 16px;
            border-radius: 999px;
            background: rgba(109, 244, 255, 0.12);
            color: var(--accent);
            font-size: 0.94rem;
          }

          label {
            display: block;
            margin-bottom: 10px;
            color: #d7e5f5;
            font-size: 0.95rem;
            font-weight: 600;
          }

          input,
          textarea {
            width: 100%;
            min-height: 48px;
            padding: 14px 16px;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            background: rgba(255, 255, 255, 0.06);
            color: var(--text);
            font-size: 0.97rem;
            outline: none;
            transition: border-color 0.25s ease, box-shadow 0.25s ease;
          }

          input:focus,
          textarea:focus {
            border-color: rgba(109, 244, 255, 0.45);
            box-shadow: 0 0 0 4px rgba(109, 244, 255, 0.08);
          }

          .action-row {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            align-items: center;
          }

          .button,
          .button.secondary {
            border: none;
            border-radius: 16px;
            padding: 14px 22px;
            font-size: 0.98rem;
            cursor: pointer;
            transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          .button {
            background: linear-gradient(135deg, rgba(109, 244, 255, 0.95), rgba(59, 230, 255, 0.72));
            color: #07101c;
            box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
          }

          .button.secondary {
            background: rgba(255, 255, 255, 0.08);
            color: var(--text);
            border: 1px solid rgba(255, 255, 255, 0.14);
          }

          .button:hover,
          .button.secondary:hover {
            transform: translateY(-2px);
          }

          .alert {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 18px;
            border-radius: 18px;
            border: 1px solid transparent;
            background: rgba(255, 255, 255, 0.08);
            color: var(--text);
            font-size: 0.95rem;
            animation: pop 0.32s ease;
          }

          .alert.success {
            border-color: rgba(101, 255, 166, 0.22);
            background: rgba(101, 255, 166, 0.08);
          }

          .alert.error {
            border-color: rgba(255, 107, 107, 0.22);
            background: rgba(255, 107, 107, 0.12);
          }

          .alert.hidden {
            display: none;
          }

          .book-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .book-card {
            position: relative;
            padding: 24px;
            border-radius: 28px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(16px);
            box-shadow: 0 20px 55px rgba(0, 0, 0, 0.22);
            overflow: hidden;
            animation: fadeInUp 0.5s ease forwards;
          }

          .book-card::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 60%);
            pointer-events: none;
          }

          .book-card h3 {
            margin: 0 0 10px;
            font-size: 1.15rem;
          }

          .book-card p {
            margin: 0;
            color: var(--muted);
            line-height: 1.75;
            font-size: 0.98rem;
          }

          .book-badge {
            display: inline-flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 16px 0 18px;
            color: var(--text);
            font-size: 0.92rem;
          }

          .badge {
            padding: 8px 12px;
            border-radius: 999px;
            background: rgba(109, 244, 255, 0.08);
            border: 1px solid rgba(109, 244, 255, 0.14);
          }

          .card-actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }

          .card-actions button {
            flex: 1;
            min-width: 120px;
            font-size: 0.92rem;
          }

          .card-actions .edit {
            background: rgba(109, 244, 255, 0.16);
            color: var(--accent);
          }

          .card-actions .delete {
            background: rgba(255, 107, 107, 0.16);
            color: #ffb4b4;
          }

          .empty-state {
            padding: 18px;
            border-radius: 22px;
            border: 1px dashed rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.04);
            color: var(--muted);
            text-align: center;
            font-size: 0.98rem;
          }

          .footer-text {
            color: var(--muted);
            font-size: 0.92rem;
          }

          @media (max-width: 980px) {
            .dashboard {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .grid-layout {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 680px) {
            .page {
              padding: 20px 16px 30px;
            }

            header,
            footer {
              flex-direction: column;
              align-items: flex-start;
            }

            .book-grid {
              grid-template-columns: 1fr;
            }

            .action-row {
              flex-direction: column;
              align-items: stretch;
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pop {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <header>
            <div class="brand">
              <div class="logo"></div>
              <div class="brand-info">
                <strong>Library Management</strong>
                <span>Modern dark glassmorphism UI</span>
              </div>
            </div>
            <div class="pill">Port 3000</div>
          </header>

          <section class="hero">
            <h1>Advanced Library Dashboard</h1>
            <p>Manage your books with search, edit, delete, and local storage persistence in a polished responsive interface.</p>
          </section>

          <section class="dashboard">
            <div class="card">
              <h2>Total Library Books</h2>
              <p class="metric" id="totalBooks">0</p>
              <small>Saved locally in your browser</small>
            </div>
            <div class="card">
              <h2>Search Results</h2>
              <p class="metric" id="searchCount">0</p>
              <small>Instant filtering in the list</small>
            </div>
            <div class="card">
              <h2>Actions Available</h2>
              <small>Add, edit, delete, and search books in real time.</small>
            </div>
          </section>

          <section class="grid-layout">
            <div class="glass-panel card">
              <div class="panel-header">
                <div>
                  <h2>Book Form</h2>
                  <p style="margin: 6px 0 0; color: var(--muted);">Use this panel to add or update library entries.</p>
                </div>
                <span class="status" id="modeLabel">Add mode</span>
              </div>

              <div id="alertBox" class="alert hidden"></div>

              <div>
                <label for="searchInput">Search by title or author</label>
                <input id="searchInput" type="search" placeholder="Search books" autocomplete="off" />
              </div>

              <div>
                <label for="titleInput">Book Title</label>
                <input id="titleInput" type="text" placeholder="Enter book title" autocomplete="off" />
              </div>

              <div>
                <label for="authorInput">Author Name</label>
                <input id="authorInput" type="text" placeholder="Enter author name" autocomplete="off" />
              </div>

              <div>
                <label for="yearInput">Publication Year</label>
                <input id="yearInput" type="number" min="1800" max="2100" placeholder="Enter publication year" />
              </div>

              <div class="action-row">
                <button id="saveButton" class="button" type="button">Add Book</button>
                <button id="clearButton" class="button secondary" type="button">Clear Form</button>
              </div>
            </div>

            <div class="glass-panel card">
              <div class="panel-header">
                <div>
                  <h2>Book Collection</h2>
                  <p style="margin: 6px 0 0; color: var(--muted);">Books appear as stylish cards with edit and delete controls.</p>
                </div>
                <span class="status">LocalStorage</span>
              </div>

              <div id="bookGrid" class="book-grid"></div>
              <div id="emptyState" class="empty-state">No books in the library yet. Add a title to get started.</div>
            </div>
          </section>

          <footer>
            <div class="footer-text">Library Management System • Node.js + Express</div>
            <div class="footer-actions">
              <div class="pill">Responsive</div>
              <div class="pill">Animated</div>
            </div>
          </footer>
        </div>

        <script>
          document.addEventListener("DOMContentLoaded", function () {
            var titleInput = document.getElementById("titleInput");
            var authorInput = document.getElementById("authorInput");
            var yearInput = document.getElementById("yearInput");
            var saveButton = document.getElementById("saveButton");
            var clearButton = document.getElementById("clearButton");
            var searchInput = document.getElementById("searchInput");
            var bookGrid = document.getElementById("bookGrid");
            var alertBox = document.getElementById("alertBox");
            var totalBooks = document.getElementById("totalBooks");
            var searchCount = document.getElementById("searchCount");
            var modeLabel = document.getElementById("modeLabel");
            var emptyState = document.getElementById("emptyState");

            var books = [];
            var editId = null;
            var storageKey = "libraryBooks";

            function loadBooks() {
              try {
                var stored = localStorage.getItem(storageKey);
                books = stored ? JSON.parse(stored) : [];
              } catch (error) {
                books = [];
              }
            }

            function saveBooks() {
              localStorage.setItem(storageKey, JSON.stringify(books));
            }

            function showAlert(message, type) {
              alertBox.textContent = message;
              alertBox.className = "alert " + type;
              alertBox.classList.remove("hidden");
              window.clearTimeout(alertBox.hideTimer);
              alertBox.hideTimer = window.setTimeout(function () {
                alertBox.classList.add("hidden");
              }, 2800);
            }

            function resetForm() {
              titleInput.value = "";
              authorInput.value = "";
              yearInput.value = "";
              editId = null;
              saveButton.textContent = "Add Book";
              modeLabel.textContent = "Add mode";
              saveButton.classList.remove("secondary");
            }

            function validateBook(title, author, year) {
              if (!title || !author) {
                showAlert("Title and author are required.", "error");
                return false;
              }

              if (year && (isNaN(year) || year < 1800 || year > 2100)) {
                showAlert("Year must be between 1800 and 2100.", "error");
                return false;
              }

              return true;
            }

            function createBookCard(book) {
              var card = document.createElement("article");
              card.className = "book-card";
              card.innerHTML =
                '<h3>' + book.title + '</h3>' +
                '<p>by <strong>' + book.author + '</strong></p>' +
                '<div class="book-badge">' +
                '<span class="badge">Year: ' + (book.year || "Unknown") + '</span>' +
                '<span class="badge">ID: ' + book.id + '</span>' +
                '</div>' +
                '<div class="card-actions">' +
                '<button class="button edit" type="button">Edit</button>' +
                '<button class="button delete" type="button">Delete</button>' +
                '</div>';

              var editButton = card.querySelector(".edit");
              var deleteButton = card.querySelector(".delete");

              editButton.addEventListener("click", function () {
                titleInput.value = book.title;
                authorInput.value = book.author;
                yearInput.value = book.year || "";
                editId = book.id;
                saveButton.textContent = "Update Book";
                modeLabel.textContent = "Edit mode";
                saveButton.classList.add("secondary");
                titleInput.focus();
              });

              deleteButton.addEventListener("click", function () {
                books = books.filter(function (item) {
                  return item.id !== book.id;
                });
                saveBooks();
                renderBooks(searchInput.value.trim());
                showAlert("Book deleted successfully.", "success");
              });

              return card;
            }

            function renderBooks(filter) {
              var query = filter ? filter.trim().toLowerCase() : "";
              bookGrid.innerHTML = "";
              var filtered = books.filter(function (book) {
                return (
                  !query ||
                  book.title.toLowerCase().includes(query) ||
                  book.author.toLowerCase().includes(query) ||
                  String(book.year).includes(query)
                );
              });

              if (filtered.length === 0) {
                emptyState.style.display = "block";
              } else {
                emptyState.style.display = "none";
                filtered.forEach(function (book) {
                  bookGrid.appendChild(createBookCard(book));
                });
              }

              totalBooks.textContent = books.length;
              searchCount.textContent = filtered.length;
            }

            saveButton.addEventListener("click", function () {
              var title = titleInput.value.trim();
              var author = authorInput.value.trim();
              var year = yearInput.value.trim();

              if (!validateBook(title, author, year)) {
                return;
              }

              if (editId) {
                books = books.map(function (book) {
                  if (book.id === editId) {
                    return {
                      id: book.id,
                      title: title,
                      author: author,
                      year: year,
                    };
                  }
                  return book;
                });
                showAlert("Book updated successfully.", "success");
              } else {
                books.unshift({
                  id: Date.now().toString(),
                  title: title,
                  author: author,
                  year: year,
                });
                showAlert("Book added successfully.", "success");
              }

              saveBooks();
              resetForm();
              renderBooks(searchInput.value.trim());
            });

            clearButton.addEventListener("click", function () {
              resetForm();
            });

            searchInput.addEventListener("input", function () {
              renderBooks(this.value);
            });

            loadBooks();
            renderBooks();
          });
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


