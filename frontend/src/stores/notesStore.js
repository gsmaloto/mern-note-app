import { create } from "zustand";
import axios from "axios";

const useNotesStore = create((set) => ({
  notes: [],
  isLoading: true,
  title: "",
  body: "",

  //update data
  updateTitle: "",
  updateBody: "",
  open: false,
  selectedId: null,

  setter: (key, value) => {
    set({ [key]: value });
  },

  fetchNotes: async () => {
    try {
      const res = await axios.get("/notes");
      set({ notes: res.data.notes, isLoading: false });
    } catch (err) {
      console.log("fetchNotes Error: ", err.message);
    }
  },

  createNote: async (e) => {
    e.preventDefault();
    // const { title, body, notes } = useNotesStore.getState();
    const title = useNotesStore.getState().title;
    const body = useNotesStore.getState().body;
    const notes = useNotesStore.getState().notes;
    const res = await axios.post("/notes", { title, body });

    set({
      notes: [...notes, res.data.note],
      title: "",
      body: "",
    });
  },

  deleteNote: async (id) => {
    const notes = useNotesStore.getState().notes;
    await axios.delete(`/notes/${id}`);
    const newNotes = notes.filter((note) => id != note._id);
    set({ notes: newNotes });
  },

  updateNote: async () => {
    const selectedId = useNotesStore.getState().selectedId;
    const updateTitle = useNotesStore.getState().updateTitle;
    const updateBody = useNotesStore.getState().updateBody;
    const notes = useNotesStore.getState().notes;
    const res = await axios.put(`notes/${selectedId}`, {
      title: updateTitle,
      body: updateBody,
    });
    //removing the item have a selectedID in all notes
    const newNotes = notes.filter((note) => note._id !== selectedId);
    set({
      notes: [...newNotes, res.data.note],
      updateBody: "",
      updateTitle: "",
      selectedId: null,
      open: false,
    });
  },
}));

export default useNotesStore;
