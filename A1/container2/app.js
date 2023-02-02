const express = require("express");
const fs = require("node:fs");
const crypto = require("crypto");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/getFile", (req, res) => {
  const filePath = req.body.filePath;
  const fullpath = 'files/' + filePath;
  fs.readFile(fullpath, "utf8", (err, data) => {
    if (err) {
      res.json({error: 'File Not Found in 2nd container'});
    }
    const output = crypto.createHash("md5").update(data).digest("hex");
    res.status(200).json({ file: filePath, checksum: output });
  });
});
app.listen(4000);
