import { useEffect, useState, useContext } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiFileText, FiLogOut, FiTrash2 } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [view, setView] = useState("notes"); // "notes", "users", "userNotes"
  const [selectedUser, setSelectedUser] = useState(null);
  const [userNotes, setUserNotes] = useState([]);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const u = await API.get("/admin/users");
      const n = await API.get("/admin/notes");
      setUsers(u.data);
      setNotes(n.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserNotes = async (userId) => {
    try {
      const res = await API.get(`/admin/users/${userId}/notes`);
      setUserNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/admin/notes/${id}`);
      if (selectedUser) fetchUserNotes(selectedUser._id);
      else fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-700 to-indigo-800 text-white flex flex-col shadow-lg">
        <div className="p-6 text-2xl font-bold border-b border-blue-600">Admin</div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            className={`flex items-center gap-2 w-full px-4 py-2 rounded transition ${
              view === "users" ? "bg-blue-600 shadow-md" : "hover:bg-blue-600"
            }`}
            onClick={() => {
              setView("users");
              setSelectedUser(null);
            }}
          >
            <FiUsers /> Users
          </button>
          <button
            className={`flex items-center gap-2 w-full px-4 py-2 rounded transition ${
              view === "notes" ? "bg-blue-600 shadow-md" : "hover:bg-blue-600"
            }`}
            onClick={() => {
              setView("notes");
              setSelectedUser(null);
            }}
          >
            <FiFileText /> All Notes
          </button>
        </nav>
        <div className="p-4 border-t border-blue-600">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex items-center gap-2 justify-center w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow-md transition"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-700">
            {view === "users"
              ? "Users"
              : selectedUser
              ? `${selectedUser.name}'s Notes`
              : "All Notes"}
          </h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Users View */}
          {view === "users" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="bg-white shadow-lg rounded-xl p-5 cursor-pointer hover:shadow-2xl transition transform hover:-translate-y-1"
                  onClick={() => {
                    setSelectedUser(u);
                    fetchUserNotes(u._id);
                    setView("userNotes");
                  }}
                >
                  <h3 className="font-semibold text-gray-800 text-lg">{u.name}</h3>
                  <p className="text-gray-600 mt-1">{u.email}</p>
                  <span className="mt-3 inline-block text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Notes View */}
          {(view === "notes" || view === "userNotes") && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(view === "notes" ? notes : userNotes).map((n) => (
                <div
                  key={n._id}
                  className="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between hover:shadow-2xl transition transform hover:-translate-y-1"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{n.title}</h3>
                    <p className="text-gray-600 mt-2">{n.description}</p>
                    {!selectedUser && (
                      <p className="text-sm text-gray-500 mt-2">
                        By {n.user?.name} ({n.user?.email})
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteNote(n._id)}
                    className="mt-4 flex items-center gap-2 justify-center bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg shadow-md transition"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              ))}
              {view === "userNotes" && userNotes.length === 0 && (
                <p className="text-gray-500 col-span-full mt-6 text-center">
                  No notes found for this user.
                </p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
