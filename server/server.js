// load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// import dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const connectToDb = require("./src/config/connectToDb");
const cors = require("cors");
const {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
} = require("./src/controllers/notesController");

const {
  signup,
  login,
  logout,
  checkAuth,
} = require("./src/controllers/usersController");
const requireAuth = require("./src/middleware/requireAuth");
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// connect to db
connectToDb();

app.post("/signup", signup);
app.post("/login", login);
app.get("/logout", logout);
app.get("/check-auth", requireAuth, checkAuth);

app.get("/notes", fetchNotes);
app.get("/notes", fetchNotes);
app.get("/notes", fetchNotes);
app.post("/notes", createNote);
app.get("/notes/:id", fetchNote);
app.put("/notes/:id", updateNote);
app.delete("/notes/:id", deleteNote);

app.listen(process.env.PORT, () => console.log("server started"));
