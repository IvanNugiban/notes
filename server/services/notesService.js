const User = require('../models/User');
const Note = require('../models/Note');

class NotesService {
    async get({userId, coAuthorId, limit, page, sortType}) {
        console.log(userId);
        let userNotes;
        if (coAuthorId) userNotes = await Note.find({creator: userId ,"coAuthors.id": coAuthorId})
        else userNotes = await Note.find({creator: userId});
        if (userNotes.length === 0) throw new Error("No notes found");
        const sortedNotes = await this.sort(sortType, userNotes);
        const totalPages = Math.ceil(sortedNotes.length / limit);
        const itemsToReturn = sortedNotes.slice(limit * (page - 1), limit * page);
        return {
            notes: itemsToReturn,
            totalPages
        };
    }

    async getPinedNotes(user, limit) {
        const pinedNotes = await Note.find({creator: user.id, pined: true});
        if (pinedNotes.length === 0) throw new Error("No notes found");
        return {
            notes: pinedNotes.slice(0, limit),
            isMoreNotes: pinedNotes.length > limit
        };
    }

    async getNotePage(noteId, sortType, creator, limit) {
        const userNotes = await Note.find({creator: creator.id});
        const sortedNotes = await this.sort(sortType, userNotes);
        const neededNotePosition = sortedNotes.findIndex(note => note.id === noteId);
        if (neededNotePosition === -1) throw new Error("Note not found");
        const page = Math.ceil((neededNotePosition + 1) / limit);
        return page;
    }

    async getSharedNotes(user, options) {
       const sharedNotes = await Note.find({"coAuthors.id": user.id});
        if (sharedNotes.length === 0) throw new Error("No one has shared notes with you");
        const differentCreators = [];
        sharedNotes.forEach(note => {
            if (!differentCreators.includes(note.creator.toString())) differentCreators.push(note.creator.toString());
        });
        const sortedNotes = await Promise.all(differentCreators.map(async creator => {
            const filteredNotes = sharedNotes.filter(note => note.creator.toString() === creator);
            const noteCreator = await User.findById(creator);
            return {
                creator: {
                    username: noteCreator.username,
                    id: noteCreator.id
                },
                notes: filteredNotes.slice(0, options.limit),
                isMoreNotes: filteredNotes.length > options.limit,
            };
        }));
        return {
           data: sortedNotes.slice(options.pageLimit * (options.page - 1), options.pageLimit * options.page),
            totalPages: Math.ceil(sortedNotes.length / options.pageLimit)
        }
        };

    async sort(sortType, notes) {
        switch (sortType) {
            case "pined":
                return notes.sort((firstNote, secondNote) => {
                    if (firstNote.pined && !secondNote.pined) return -1;
                    if (!firstNote.pined && secondNote.pined) return 1;
                    if (firstNote.pined && secondNote.pined) return 0;
                    if (!firstNote.pined && !secondNote.pined) return 0;
                });
            case "oldest" :
                return notes.sort((firstNote, secondNote) => {
                    if (new Date(firstNote.createdOn).getTime() > new Date(secondNote.createdOn).getTime()) return 1;
                    if (new Date(firstNote.createdOn).getTime() < new Date(secondNote.createdOn).getTime()) return -1;
                    if (new Date(firstNote.createdOn).getTime() === new Date(secondNote.createdOn).getTime()) return 0;
                });
            case "newest" :
                return notes.sort((firstNote, secondNote) => {
                    if (new Date(firstNote.createdOn).getTime() > new Date(secondNote.createdOn).getTime()) return -1;
                    if (new Date(firstNote.createdOn).getTime() < new Date(secondNote.createdOn).getTime()) return 1;
                    if (new Date(firstNote.createdOn).getTime() === new Date(secondNote.createdOn).getTime()) return 0;
                });
            case "lastChange" :
                return notes.sort((firstNote, secondNote) => {
                    if (new Date(firstNote.lastChanged.date).getTime() > new Date(secondNote.lastChanged.date).getTime()) return -1;
                    if (new Date(firstNote.lastChanged.date).getTime() < new Date(secondNote.lastChanged.date).getTime()) return 1;
                    if (new Date(firstNote.lastChanged.date).getTime() === new Date(secondNote.lastChanged.date).getTime()) return 0;
                });
            default:
                return notes;
        }
    }

    async findUser(username, author) {
        if (username === author) throw new Error("You already have access to this note");
        const foundUser = await User.findOne({username});
        if (!foundUser) throw new Error("User with this name not found");
        return {
            username: foundUser.username,
            id: foundUser.id
        };
    }

    async add(noteCreator, {pined, background, lastChanged, ...params}) {
        return Note.create({creator: noteCreator.id, pined, background, lastChanged, ...params});
    }

    async change({id, ...note}) {
        return Note.findByIdAndUpdate(id, {...note});
    }

    async deleteOne(id) {
        return Note.findByIdAndDelete(id);
    }

    async deleteAll(creator) {
        return Note.deleteMany({creator});
    }
}

module.exports = new NotesService();