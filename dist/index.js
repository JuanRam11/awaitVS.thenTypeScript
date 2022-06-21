"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.port;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/await', async (req, res) => {
    const data = await axios_1.default.get('https://api.github.com/users');
    res.json(data.data);
});
app.get('/then', (req, res) => {
    axios_1.default
        .get('https://api.github.com/users')
        .then((response) => {
        res.json(response.data);
    })
        .catch((err) => {
        console.error(err);
    });
});
app.listen(port, () => {
    console.log(`Running at port ${port}`);
});
