const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
console.log("It works");
})
