const mongoose = require("mongoose");
const {Schema} = mongoose;

const NotesSchema = new Schema({
    title: {
        type: String, required: true, unique: true
    },
    description: {
        type: String, required: true
    },
    tag: {
        type: String, default: "General"
    },
    date: {
        type: Date, required: true
    },
});

const Notes = mongoose.model('notes', NotesSchema);
Notes.createIndexes();
module.exports = Notes;