import axios = require('axios');
import express, { Express, Request, response, Response } from 'express';
import dotenv from 'dotenv';
const app = express();
const port = process.env.port;
dotenv.config();
app.use(express.json());

app.get('/await', async (req: Request, res: Response) => {
  const data = await axios.get<GetUsersResponse>(
    'https://api.github.com/users'
  );
  res.json(data.data);
});

app.get('/then', (req: Request, res: Response) => {
  axios
    .get('https://api.github.com/users')
    .then((response: Response) => {
      res.json(response.data);
    })
    .catch((err: Error) => {
      console.error(err);
    });
});

app.listen(port, () => {
  console.log(`Running at port ${port}`);
});

type Campos = {
  id: number;
  email: string;
  first_name: string;
};

type GetUsersResponse = {
  data: Campos[];
};
