const {Schema, model, ObjectId} = require("mongoose");

const Notebook = new Schema({
    text: {type: String, default: ""},
    user: {type: ObjectId, ref: "User", required: true}
})

module.exports = model("Notebook", Notebook);