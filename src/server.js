require("express-async-errors");
require("dotenv/config");

const cors = require("cors");
const express = require("express");

const router = require("./routes");
const AppError = require("./utils/AppError");
const { UPLOADS_FOLDER } = require("./configs/upload");

const port = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.listen(port, () => console.log(`Server listening on localhost:${port}`));
app.use(express.json());
app.use(router);

app.use((err, request, response, next) => {
  if (err instanceof AppError) {
    response.status(err.statusCode);
    response.json({ error: err.message });
  } else {
    console.error(err);
    response.status(500);
    response.json({ error: "Internal Server Error" });
  }
});

app.use("/files", express.static(UPLOADS_FOLDER));
