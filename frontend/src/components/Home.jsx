import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
const Home = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");
  const {
    data: notes,
    isLoading,
    error,
  } = useQuery(["notes"], async () => {
    const response = await axios.get("http://localhost:3000/notes");
    return response.data.notes;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:3000/notes", {
      title,
      body,
    });
    return res;
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:3000/notes/${id}`);
    console.log("deleted ", id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://localhost:3000/notes/${selectedId}`, {
      title: updateTitle,
      body: updateBody,
    });
    setOpen(false);
    setSelectedId(null);
    setUpdateTitle("");
    setUpdateBody("");
    return res;
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">titlte</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Body</label>
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button type="submit">ADD NOTE</button>
      </form>
      <ol>
        {notes?.map((note) => (
          <li key={note._id}>
            <p>{note.title}</p>
            <p>{note.body}</p>
            <p>{note.openUpdate}</p>

            <button onClick={() => handleDelete(note._id)}>delete</button>
            <button
              onClick={() => {
                setOpen(true);
                setUpdateTitle(note.title);
                setUpdateBody(note.body);
                setSelectedId(note._id);
              }}
            >
              update
            </button>
          </li>
        ))}
      </ol>
      {open && (
        <div>
          <form>
            <p onClick={() => setOpen(false)}>X</p>

            <input
              type="text"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <input
              type="text"
              value={updateBody}
              onChange={(e) => setUpdateBody(e.target.value)}
            />
            <p>ID: {selectedId}</p>
            <button onClick={handleUpdate}>Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
