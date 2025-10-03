import express from 'express';
import cors from 'cors';
import config from './config';
import { healthController } from './routes/health';
import { listUsersController } from './routes/users';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: config.corsOrigins.length > 0 ? config.corsOrigins : true,
    credentials: true
  })
);

app.get('/api/health', healthController);
app.get('/api/users', listUsersController);

export default app;
