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

app.get('/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.post('/guides', createGuideController);

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