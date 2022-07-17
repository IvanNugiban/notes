const noteService = require('../services/notesService');

class noteController {
    async get(req, res) {
        try {
            const notesData = await noteService.get(req.query);
            return res.json(notesData);
        } catch (e) {
            console.log(e);
            res.status(404).json(e.message);
        }
    }

    async getPined(req, res) {
        try {
            const user = req.user;
            const limit = req.query.limit;
            res.json(await noteService.getPinedNotes(user, limit));
        }
        catch (e) {
            console.log(e.message);
            res.status(404).json(e.message);
        }
    }

    async getNotePage(req, res) {
        try {
            const creator = req.user;
            const {noteId, sortType, limit} = req.query;
            return res.json(await noteService.getNotePage(noteId, sortType, creator, limit));
        }
        catch (e) {
            console.log(e);
            res.status(404).json(e.message)
        }
    }

    async getSharedNotes(req, res) {
        try {
            const user = req.user;
            const options = req.query;
            return res.json(await noteService.getSharedNotes(user, options))
        }
        catch(e) {
            console.log(e);
            res.status(404).json(e.message)
        }
    }

    async findUser(req, res) {
        try {
            const {username, author} = req.body;
            const user = await noteService.findUser(username, author);
            res.json({...user});
        } catch (e) {
            res.status(404).json(e.message);
        }
    }

    async add(req, res) {
        try {
            await noteService.add(req.user, req.body);
            return res.json("Note has been created");
        } catch (e) {
            console.log(e);
            return res.status(400).json("Unexpected error");
        }
    }

    async change(req, res) {
        try {
            await noteService.change(req.body);
            return res.json("Note has been changed");
        }
        catch (e) {
            console.log(e);
            return res.status(400).json("Unexpected error")
        }
    }

    async deleteOne(req, res) {
        try {
            await noteService.deleteOne(req.body.id);
            return res.json("Note has been deleted")
        }
        catch (e) {
            res.status(400).json(e);
        }
    }

    async deleteAll(req, res) {
        await noteService.deleteAll(req.body.creator);
        return res.json("Notes have been deleted");
    }
}

module.exports = new noteController();