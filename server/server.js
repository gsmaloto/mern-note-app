// load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// import dependencies
const express = require("express");
const connectToDb = require("./src/config/connectToDb");
const cors = require("cors");

const {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
} = require("./src/controllers/notesController");
const app = express();

//middleware
app.use(express.json());
app.use(cors());

// connect to db
connectToDb();

app.get("/", (req, res) => {
  res.json("hello world");
});
// get all notes
app.get("/notes", fetchNotes);

// create note
app.post("/notes", createNote);

//get single note
app.get("/notes/:id", fetchNote);

// update note
app.put("/notes/:id", updateNote);

// delete note
app.delete("/notes/:id", deleteNote);

app.listen(process.env.PORT, () => console.log("server started"));
