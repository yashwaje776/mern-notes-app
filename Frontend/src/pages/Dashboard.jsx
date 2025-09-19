import { useEffect, useState, useContext } from "react";
import API from "../api";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiLogOut } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const fetchNotes = async () => {
    try {
      const { data } = await API.get("/notes");
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    try {
      await API.post("/notes", form);
      setForm({ title: "", description: "" });
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
      {/* Navbar */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 flex justify-between items-center shadow-md">
        <h2 className="text-3xl font-bold text-white">My Notes</h2>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition"
        >
          <FiLogOut /> Logout
        </button>
      </header>

      {/* Add Note Form */}
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
        <form onSubmit={addNote} className="flex flex-col md:flex-row gap-4">
          <input
            className="border p-4 rounded-lg flex-1 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm placeholder-gray-400"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="border p-4 rounded-lg flex-1 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm placeholder-gray-400"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-lg shadow-md font-semibold flex items-center gap-2 transition"
          >
            <FiPlus /> Add Note
          </button>
        </form>
      </div>

      {/* Notes Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {notes.length > 0 ? (
          notes.map((note) => <NoteCard key={note._id} note={note} refresh={fetchNotes} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full mt-6">
            No notes yet. Add one above!
          </p>
        )}
      </div>
    </div>
  );
}
