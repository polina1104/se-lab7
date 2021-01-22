import express from 'express';             //подключаем express, node -v - версия
import bodyParser from 'body-parser';
import cors from 'cors';

import usersRoutes from './routes/guides.js';

const app = express ();
const PORT = 5001;                         //port for the server

app.use(bodyParser.json());
app.use(cors());

app.use('/guide', usersRoutes);

app.get('/', (req, res) =>
    res.send('Hello world')
);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
