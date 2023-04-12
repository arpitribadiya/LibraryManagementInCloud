const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());

app.use("/", require("./routes/test"));
app.use("/admins", require("./routes/admins"));
app.use("/librarians", require("./routes/librarians"));
app.use("/students", require("./routes/students"));
app.use("/utils", require("./routes/utils"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
