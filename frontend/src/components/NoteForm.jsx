import { useState } from "react";

function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onAdd({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-3"
    >
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded-md"
      />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 rounded-md resize-none h-24"
      />
      <button
        type="submit"
        className="bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 cursor-pointer transition"
      >
        Add Note
      </button>
    </form>
  );
}

export default NoteForm;
