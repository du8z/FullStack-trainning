const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = []; // Ceci est une liste en mémoire pour stocker les utilisateurs

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword };
  users.push(user);
  res.status(201).json({ message: "Utilisateur créé" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Utilisateur non trouvé" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Mot de passe incorrect" });
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ token, user: { email: user.email } });
};

exports.getUser = (req, res) => {
  const user = users.find((u) => u.email === req.user.email);
  res.status(200).json({ email: user.email });
};
