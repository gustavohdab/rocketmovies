require("express-async-errors");
require("dotenv").config();
const migrationsRun = require("./database/sqlite");
const uploadConfig = require("./configs/upload");
const AppError = require("./utils/AppError");
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));

migrationsRun();

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.error(err);

  return res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🔥`);
});