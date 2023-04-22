import { useEffect } from "react";
import useNotesStore from "../stores/notesStore";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
const Home = () => {
  const {
    //variable
    title,
    body,
    updateTitle,
    updateBody,
    notes,
    selectedId,
    open,
    isLoading,
    // function
    setter,
    fetchNotes,
    createNote,
    deleteNote,
    updateNote,
  } = useNotesStore((state) => state);
  const navigate = useNavigate();
  const loggedIn = useAuthStore((state) => state.loggedIn);
  useEffect(() => {
    if (!loggedIn) {
      return navigate("/login");
    } else {
      fetchNotes();
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateNote();
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <main className="container mx-auto">
      {!open && (
        <>
          <form
            onSubmit={createNote}
            className="grid grid-cols-2 gap-4 p-8 bg-gray-100 rounded-lg shadow-md"
          >
            <div className="col-span-2">
              <label htmlFor="title" className="font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                value={title}
                onChange={(e) => setter("title", e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="body" className="font-medium text-gray-700">
                Body
              </label>
              <input
                type="text"
                id="body"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                value={body}
                onChange={(e) => setter("body", e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md"
            >
              Add Note
            </button>
          </form>
          <h1 className="text-3xl text-center font-bold my-8 text-gray-800">
            All Notes
          </h1>
          <ol className="grid gap-4">
            {notes?.map((note) => (
              <li
                key={note._id}
                className="grid grid-cols-6 gap-4 p-4 bg-white rounded-lg shadow-md"
              >
                <p className="font-medium text-gray-800">{note.title}</p>
                <p className="col-span-4 text-gray-600">{note.body}</p>
                <div className="grid gap-4 col-span-1">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg shadow-md"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteNote(note._id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-md"
                    onClick={() => {
                      setter("open", true);
                      setter("updateTitle", note.title);
                      setter("updateBody", note.body);
                      setter("selectedId", note._id);
                    }}
                  >
                    Update
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
      {open && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-opacity-50">
          <form className="max-w-md w-full bg-white shadow-lg rounded-lg px-6 py-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Update Note</h2>
              <button
                type="button"
                onClick={() => setter("open", false)}
                className="text-gray-700 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-4">
              <label
                htmlFor="updateTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="updateTitle"
                id="updateTitle"
                value={updateTitle}
                onChange={(e) => setter("updateTitle", e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="updateBody"
                className="block text-sm font-medium text-gray-700"
              >
                Body
              </label>
              <textarea
                id="updateBody"
                name="updateBody"
                rows="3"
                value={updateBody}
                onChange={(e) => setter("updateBody", e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">
                ID: {selectedId}
              </p>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                onClick={handleUpdate}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default Home;
