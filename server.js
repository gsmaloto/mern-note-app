// load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// import dependencies
const express = require("express");
const connectToDb = require("./src/config/connectToDb");
const Note = require("./src/models/note");

const app = express();

//middleware
app.use(express.json());

// connect to db
connectToDb();

app.get("/", (req, res) => {
  res.json("hello world");
});
// get all notes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();

  res.json({ notes: notes });
});

// create note
app.post("/notes", async (req, res) => {
  const { title, body } = req.body;

  const note = await Note.create({
    title,
    body,
  });

  res.json({ note: note });
});

//get single note
app.get("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId);

  res.json({ note: note });
});

// update note
app.put("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  const { title, body } = req.body;

  //   find and update the note
  await Note.findByIdAndUpdate(noteId, {
    title,
    body,
  });
  //   find updated note
  const note = await Note.findById(noteId);

  res.json({ note: note });
});

// delete note
app.delete("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  await Note.findByIdAndDelete(noteId);
  res.json({ success: "deleted Sucessfully" });
});

app.listen(process.env.PORT, () => console.log("server started"));
