import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import __dirname from './utils/index.js';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.config.js';
import router from './routes/index.router.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'public')));

export default app;
