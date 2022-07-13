const notebookService = require("../services/notebookService");

class notebookController {
    async get(req, res) {
        try {
            const userId = req.user.id;
            res.json(await notebookService.get(userId));
        } catch (e) {
            console.log(e);
            res.status(400).json(e);
        }
    }

    async set(req, res) {
        try {
            const userId = req.user.id;
            const text = req.body.text;
            await notebookService.set(userId, text);
        } catch (e) {
            console.log(e);
            res.status(400).json(e);
        }
    }
}

module.exports = new notebookController();