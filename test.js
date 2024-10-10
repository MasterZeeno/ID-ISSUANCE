// npm i @tensorflow/tfjs-node
import * as faceapi from 'face-api.js';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

// Load models for face-api.js
export const loadModels = async () => {
  const modelPath = path.join(process.cwd(), 'models', 'ssd_mobilenetv1');  // Use process.cwd() for absolute path
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);  // Load face detection model
};

// Detect faces and crop image with dynamic sizing
export const cropFace = async (imagePath, outputPath, sizeStrategy = 'maintainAspectRatio') => {
  // Load image as a buffer using sharp
  const imageBuffer = await fs.readFile(imagePath);
  const img = await sharp(imageBuffer).toBuffer();

  // Decode the image for face-api.js
  const imgTensor = faceapi.bufferToImage(img);

  // Detect face
  const detection = await faceapi.detectSingleFace(imgTensor).withFaceLandmarks();
  if (!detection) {
    console.log('No face detected');
    return;
  }

  const { x, y, width, height } = detection.detection.box;

  // Define cropping square (ensures the face is centered)
  const faceSize = Math.max(width, height);  // Use the larger dimension of the face
  const cropX = Math.max(0, x + width / 2 - faceSize / 2);
  const cropY = Math.max(0, y + height / 2 - faceSize / 2);

  // Determine output size based on strategy
  let outputWidth, outputHeight;
  switch (sizeStrategy) {
    case 'maintainAspectRatio':
      // Maintain original aspect ratio
      const metadata = await sharp(imageBuffer).metadata();
      const aspectRatio = metadata.width / metadata.height;
      if (aspectRatio > 1) {
        outputWidth = 500;
        outputHeight = Math.round(500 / aspectRatio);
      } else {
        outputWidth = Math.round(500 * aspectRatio);
        outputHeight = 500;
      }
      break;

    case 'minDimension':
      // Use the minimum of the width or height to make a square crop
      const minDimension = Math.min(metadata.width, metadata.height);
      outputWidth = outputHeight = minDimension;
      break;

    case 'averageDimension':
      // Use the average of the width and height
      const avgDimension = Math.round((metadata.width + metadata.height) / 2);
      outputWidth = outputHeight = avgDimension;
      break;

    default:
      throw new Error('Invalid size strategy');
  }

  // Process image with sharp
  await sharp(imageBuffer)
    .extract({ left: Math.round(cropX), top: Math.round(cropY), width: Math.round(faceSize), height: Math.round(faceSize) })
    .resize(outputWidth, outputHeight)  // Dynamically set based on the strategy
    .toFile(outputPath);
};

// Example usage
(async () => {
  await loadModels();
  await cropFace('./test/test.jpg', './test/output-cropped-image.jpg', 'maintainAspectRatio');
})();