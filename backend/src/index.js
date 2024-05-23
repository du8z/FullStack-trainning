const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Serveur API en cours d'exécution sur http://localhost:${PORT}`);
});
