const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: process.env.NEXT_PUBLIC_API_URL,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));