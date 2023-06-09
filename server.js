const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require("C:/Users/Tung Do/Desktop/soundarise/firebase.json"); // Replace with the path to your service account credentials file
const app = express();

// Configure multer for file upload handling
const upload = multer({
  dest: 'uploads/' // Set the destination folder where uploaded files will be temporarily stored
});

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Middleware to parse request bodies
app.use(bodyParser.json({ limit: '300mb' }));
app.use(bodyParser.urlencoded({ limit: '300mb', extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

const bucket = admin.storage().bucket("trackrecords-3a228.appspot.com"); // Replace with your Firebase Storage bucket name

app.get('/get-grid-items', (req, res) => {
  const file = bucket.file('music.json'); // Replace with the actual file name used for saving grid items

  file.download()
    .then((data) => {
      const gridItems = JSON.parse(data.toString());
      console.log('Grid items retrieved from Firebase Storage:', gridItems); // Log the retrieved grid items

      // Send the grid items as the response
      res.status(200).json(gridItems);
    })
    .catch((err) => {
      console.error('Error retrieving grid items:', err);
      res.status(500).json({ message: 'Error retrieving grid items' });
    });
});

app.post('/save-grid-items', (req, res) => {
  const file = bucket.file('music.json'); // Replace with your desired file name
  const data = JSON.stringify(req.body); // Convert the grid item data to JSON string
  console.log('Received grid item data:', data); // Log the received grid item data

  file.save(data, {
    metadata: {
      contentType: 'application/json'
    }
  })
    .then(() => {
      console.log('Grid item information saved to Firebase Storage');
      res.status(200).json({ message: 'Grid item information saved' });
    })
    .catch((err) => {
      console.error('Error saving grid item information:', err);
      res.status(500).json({ message: 'Error saving grid item information' });
    });
});

app.post('/upload-audio', (req, res) => {
  const fileName = req.body.fileName; // Get the desired file name from the request body
  const file = bucket.file(`audio/${fileName}`); // Replace with the desired file path/name in the bucket

  file.createResumableUpload()
    .then(([url]) => {
      res.status(200).json({ uploadUrl: url });
    })
    .catch((err) => {
      console.error('Error generating signed URL:', err);
      res.status(500).json({ message: 'Error generating signed URL' });
    });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
