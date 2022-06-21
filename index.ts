import axios from 'axios';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.port;
const app = express();
app.use(express.json());

app.get('/await', async (req: Request, res: Response) => {
  const data: any = await axios.get('https://api.github.com/users');
  res.json(data.data);
});

app.get('/then', (req: Request, res: Response) => {
  axios
    .get('https://api.github.com/users')
    .then((response) => {
      res.json(response.data);
    })
    .catch((err: Error) => {
      console.error(err);
    });
});

app.listen(port, () => {
  console.log(`Running at port ${port}`);
});

export {};

declare global {
  namespace Express {
    interface Response {
      data: JSON;
    }
  }
}

interface Typeof {
  get: any;
}
