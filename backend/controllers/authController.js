import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (role === "admin") {
      if (
        email === process.env.ADMINEMAIL &&
        password === process.env.ADMINPASSWORD
      ) {
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
          return res.status(400).json({ message: "Admin already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const admin = await User.create({
          name,
          email,
          password: hashed,
          role: "admin",
        });

        return res.status(201).json({
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          token: generateToken(admin._id, "admin"),
        });
      } else {
        return res.status(400).json({ message: "Invalid admin credentials" });
      }
    }

    // ✅ Otherwise normal user
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "user",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, "user"),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
