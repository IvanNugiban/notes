const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/authRouter');
const notesRouter = require('./routes/notesRouter')
const corsMiddleware = require('./middleware/cors.middleware')

const app = express();
const PORT = config.get("serverPort");

app.use(corsMiddleware)
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"));

        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`);
        });
    } catch (e) {

    }
};

start();