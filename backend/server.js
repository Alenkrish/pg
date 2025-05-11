const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb+srv://alenkrish:pg1234@cluster0.ge4edtf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Connection error:', err));

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const Photo = require('./models/Photo');

app.post('/upload', upload.single('photo'), async (req, res) => {
  const newPhoto = new Photo({
    filename: req.file.filename,
    path: req.file.path,
    uploadedAt: new Date()
  });
  await newPhoto.save();
  res.json({ message: 'Image uploaded!', photo: newPhoto });
});

app.get('/photos', async (req, res) => {
  const photos = await Photo.find().sort({ uploadedAt: -1 });
  res.json(photos);
});

app.listen(PORT, () => console.log(`PG Backend running on http://localhost:${PORT}`));
