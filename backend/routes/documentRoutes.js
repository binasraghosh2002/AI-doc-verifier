/*const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadDocument, getAllDocuments } = require('../controllers/documentController');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Routes
router.post('/upload', upload.single('document'), uploadDocument);
router.get('/', getAllDocuments);

module.exports = router;
*/

import express from 'express';
import multer from 'multer';
import { uploadDocument, getAllDocuments } from '../controllers/documentController.js'; // <- .js

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/upload', upload.single('document'), uploadDocument);
router.get('/', getAllDocuments);

export default router;

