function NoteCard({ note, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="font-semibold text-lg text-gray-800">{note.title}</h2>
      <p className="text-gray-600 mt-2 whitespace-pre-line">{note.content}</p>
      <button
        onClick={() => onDelete(note.id)}
        className="mt-3 text-sm text-red-500 transition-all hover:text-red-700 cursor-pointer hover:font-bold"
      >
        Delete
      </button>
    </div>
  );
}

export default NoteCard;
