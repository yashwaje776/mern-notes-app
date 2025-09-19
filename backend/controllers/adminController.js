import User from "../models/User.js";
import Note from "../models/Note.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("user", "name email");
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteNoteByAdmin = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Note deleted by admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
