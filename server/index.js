const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/authRouter');
const notebookRouter = require('./routes/notebookRouter')
const notesRouter = require('./routes/notesRouter');
const corsMiddleware = require('./middleware/cors.middleware');

const app = express();
const PORT =  process.env.PORT || config.get("serverPort");

app.use(corsMiddleware)
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/notebook", notebookRouter);
app.use("/api/notes", notesRouter);
app.options('/*', (_, res) => {
    res.sendStatus(200);
});

const start = async () => {
        await mongoose.connect(config.get("dbUrl"));

        app.listen(PORT);
};

start();