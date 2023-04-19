const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  const notes = await Note.find();

  res.json({ notes: notes });
};

const fetchNote = async (req, res) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId);

  res.json({ note });
};

const createNote = async (req, res) => {
  const { title, body } = req.body;

  const note = await Note.create({
    title,
    body,
  });

  res.json({ note });
};

const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const { title, body } = req.body;

  //   find and update the note
  await Note.findByIdAndUpdate(noteId, {
    title,
    body,
  });
  //   find updated note
  const note = await Note.findById(noteId);

  res.json({ note });
};

const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  await Note.findByIdAndDelete(noteId);
  res.json({ success: "deleted Sucessfully" });
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
