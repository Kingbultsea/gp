const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: '/Users/starlink_brench01/Desktop/github_project/images/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

app.listen(8081, () => {
    console.log('Server is running on port 8080');
});
