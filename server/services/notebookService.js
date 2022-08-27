const Notebook = require("../models/Notebook")

class NotebookService {
    async get(userId) {
        const notebook = await Notebook.findOne({user : userId});
        return notebook.text;
    }

    async set(userId, text) {
        return Notebook.findOneAndUpdate({user : userId}, {text})
    }
}

module.exports = new NotebookService();