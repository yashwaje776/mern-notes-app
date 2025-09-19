const adminOnly = (req, res, next) => {
  if (req.userRole !== "admin") return res.status(403).json({ message: "Forbidden" });
  next();
};

export default adminOnly;
