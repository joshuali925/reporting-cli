#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const tess = require("tesseract.js");

const createWorker = tess.createWorker;

const [,, imagePath] = process.argv;
const image = path.resolve(__dirname, (imagePath || './logs.png'));

console.log(`Recognizing ${image}`);

(async () => {
  const worker = await createWorker();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text, pdf } } = await worker.recognize(image, {pdfTitle: "Example PDF"}, {pdf: true});
  console.log(text);
  fs.writeFileSync('tesseract-ocr-result.pdf', Buffer.from(pdf));
  console.log('Generate PDF: tesseract-ocr-result.pdf');
  await worker.terminate();
})();
