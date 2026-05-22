import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createGuide, getGuide } from './services/guideService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.get('/getGuide', (req, res) => {
  res.json(getGuide(req.query.guideID as string, req.query.firebaseCollection as string));
});

app.get('/create', (req, res) => {
  res.json(createGuide(req.body, req.query.firebaseCollection as string));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});