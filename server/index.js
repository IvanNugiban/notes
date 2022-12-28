const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const notebookRouter = require('./routes/notebookRouter')
const notesRouter = require('./routes/notesRouter');
const corsMiddleware = require('./middleware/cors.middleware');
const helmet = require("helmet")
require('dotenv').config()

const app = express();
const PORT =  process.env.PORT || 5050;

app.use(corsMiddleware)
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/notebook", notebookRouter);
app.use("/api/notes", notesRouter);
app.use(helmet());

app.options('/*', (_, res) => {
    res.sendStatus(200);
});

const start = async () => {
        await mongoose.connect(process.env.DB_URL);

        app.listen(PORT);
};

start();