import { useState } from "react";
import API from "../api";
import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

export default function NoteCard({ note, refresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);

  const saveEdit = async () => {
    if (!title || !description) return;
    await API.put(`/notes/${note._id}`, { title, description });
    setIsEditing(false);
    refresh();
  };

  const deleteNote = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await API.delete(`/notes/${note._id}`);
      refresh();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition">
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <input
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={saveEdit}
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
            >
              <FiCheck /> Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
            >
              <FiX /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="mb-4">
            <h3 className="font-semibold text-lg text-gray-800">{note.title}</h3>
            <p className="text-gray-600 mt-2">{note.description}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition"
            >
              <FiEdit /> Edit
            </button>
            <button
              onClick={deleteNote}
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
