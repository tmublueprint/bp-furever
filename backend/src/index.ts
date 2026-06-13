import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { getAllGuidesController, getGuideController, createGuideController, deleteGuideController, getGuideImageController, getGuidePdfController } from './controllers/guideController.js';
import multer from 'multer';
import { onRequest } from 'firebase-functions/v2/https';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(helmet());
app.use(cors());

const upload = multer({
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB
  },
  storage: multer.memoryStorage(),
});

// Create guide (accepts multipart/form-data or url fields)
app.post('/guides', (req, res, next) => {
  upload.fields([
    { name: 'image' },
    { name: 'pdf' }
  ])(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({
        error: err.message,
        stack: err.stack,
      });
    }

    console.log('Files parsed:', req.files);
    next();
  });
}, createGuideController);
app.use(express.json());

app.post('/api/debug-upload', upload.any(), (req, res) => {
  console.log('files:', req.files);
  console.log('body:', req.body);
  res.json({ ok: true });
});

app.get('/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.get('/guides', getAllGuidesController);

app.get('/guides/:guideID', getGuideController);

app.get('/guides/:guideID/image', getGuideImageController);

app.get('/guides/:guideID/pdf', getGuidePdfController);

app.delete('/guides/:guideID', deleteGuideController);


export const api = onRequest({ invoker: 'public' }, app);

if (process.env.FUNCTIONS_EMULATOR !== 'true' && !process.env.K_SERVICE) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}