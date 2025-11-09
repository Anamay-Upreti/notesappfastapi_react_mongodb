import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import NoteForm from "../components/NoteForm.jsx";

function Dashboard() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes/");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addNote = async (noteData) => {
    try {
      await API.post("/notes/", noteData);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 space-y-8 px-4">
        <NoteForm onAdd={addNote} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={deleteNote} />
            ))
          ) : (
            <p className="text-center text-gray-600 w-full col-span-3">
              No notes yet — add your first one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
