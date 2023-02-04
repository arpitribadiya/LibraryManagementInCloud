const express = require('express');
var bodyParse = require('body-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require("node-fetch");

var app = express();

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/checksum", function(req,res,next){
  var val = req.body.file;
  if(val===null)
  {
    res.json(
      {
        file: null,
        error: 'Invalid JSON input.'
      })
  }
  else if(val==="")
  {
    res.json(
      {
        file: "",
        error: 'File not found.'
      })
  }
  else{
    const path = 'files/' + val;
    if (fs.existsSync(path)) {
      const response = fetch("http://container2:4000/getFile", {
          method: "post",
          body: JSON.stringify({ filePath: val }),
          headers: { "Content-Type": "application/json" },
        })
          .then(result => {
            return result.json();
          })
          .then(rr => {
            res.json(rr);
          })
          .catch(err => {
            res.send(err);
          });
    } else {
      res.json(
        {
          file: req.body.file,
          error: 'File not found.'
        })
    }
  }
});

app.listen(5000);