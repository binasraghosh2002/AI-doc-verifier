import { extractTextFromFile } from '../utils/ocr.js';
import {Document} from '../models/Document.js';

export const uploadDocument = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    const extractedText = await extractTextFromFile(req.file);

    // Placeholder AI validation
    const validationResult = extractedText.includes('Name') ? 'Valid' : 'Check manually';

    const doc = new Document({
      filename: req.file.originalname,
      extractedText,
      validationResult
    });

    await doc.save();

    res.json({ filename: req.file.originalname, extractedText, validationResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
