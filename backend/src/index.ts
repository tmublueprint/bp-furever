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
app.use(express.json());

const upload = multer();

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.get('/api/guides', getAllGuidesController);

app.get('/api/guides/:guideID', getGuideController);

app.get('/api/guides/:guideID/image', getGuideImageController);

app.get('/api/guides/:guideID/pdf', getGuidePdfController);

app.delete('/api/guides/:guideID', deleteGuideController);

// Create guide (accepts multipart/form-data or url fields)
app.post('/api/guides', upload.fields([{ name: 'image' }, { name: 'pdf' }]), createGuideController);

export const api = onRequest(app);

if (process.env.FUNCTIONS_EMULATOR !== 'true' && !process.env.K_SERVICE) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}