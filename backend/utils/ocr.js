/*const Tesseract = require('tesseract.js-node');

const extractTextFromFile = async (filePath) => {
  try {
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng', {
      logger: m => console.log(m) // logs OCR progress
    });
    return text || ''; // ensures we never return null
  } catch (error) {
    console.error('OCR Error:', error);
    return ''; // safe fallback
  }
};

module.exports = { extractTextFromFile };
*/
/*
import fs from 'fs';
import Tesseract from 'tesseract.js-node';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

export const extractTextFromFile = async (file) => {
  let extractedText = '';

  if (file.mimetype === 'application/pdf') {
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);
    extractedText = pdfData.text;

  } else if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    const result = await Tesseract.recognize(file.path, 'eng', {
      logger: m => console.log(m)
    });
    extractedText = result.data.text;

  } else {
    throw new Error('Unsupported file type');
  }

  return extractedText;
};
*/

import fs from 'fs';
import OpenAI from './openaiClient.js'; // make sure openaiClient.js is ES module

export const extractTextFromFile = async (file) => {
  try {
    // Read file as base64
    const fileData = fs.readFileSync(file.path, { encoding: 'base64' });

    // Use OpenAI Chat Completion to extract text
    const response = await OpenAI.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that extracts all readable text from documents.'
        },
        {
          role: 'user',
          content: `Extract text from this base64 encoded file: ${fileData}`
        }
      ]
    });

    const text = response.choices[0].message.content;
    return text || '';

  } catch (error) {
    console.error('OpenAI OCR Error:', error);
    return '';
  }
};
