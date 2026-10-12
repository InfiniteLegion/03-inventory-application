const express = require("express");
const path = require("node:path");

const app = express();
const cssPath = path.join(__dirname, "public/css");

app.use(express.static(cssPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server listening on port ${PORT}.\nhttp://localhost:${PORT}`);
});
