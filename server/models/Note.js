const {Schema, model, ObjectId} = require("mongoose");

const Note = new Schema({
    title: {type: String},
    text: {type: String},
    background: {type: String, required: true},
    creator: {type: ObjectId, ref: "User", required: true},
    pined: {type: Boolean, required: true},
    coAuthors: {
        type: [{
            id: ObjectId,
            username: String
        }], ref: "User"
    },
    createdOn: {type: Date, default: () => new Date().toString()},
    lastChanged: {type: Object, required: true}
});

module.exports = model("Note", Note);