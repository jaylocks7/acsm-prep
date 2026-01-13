import express from 'express';
import dotenv from 'dotenv';
import analyzeRouter from './routes/analyze';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//so we can parse field from req body
app.use(express.json());
app.use('/analyze', analyzeRouter);
app.use(errorHandler);

//Define port to run on
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
})