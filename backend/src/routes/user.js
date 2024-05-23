const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const User = require("../models/user");

// Route pour obtenir les informations de l'utilisateur connecté
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

module.exports = router;
