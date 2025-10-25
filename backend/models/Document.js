import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  filename: String,
  extractedText: String,
  validationResult: String
}, { timestamps: true });

// Named export for ESM
export const Document = mongoose.model('Document', documentSchema);
