const path = require("path");
const tess = require("tesseract.js");
const fs = require("fs");

const createWorker = tess.createWorker;

console.log("hi");

let data;

const image = path.resolve(__dirname, "./logs.png");

async function run() {
  const worker = await createWorker({
    logger: (m) => console.log(m),
  });

  await worker.loadLanguage("eng");
  await worker.initialize("eng");

  data = await worker.recognize(image);
  console.log("❗data:", data);
  await worker.terminate();
}

run();
