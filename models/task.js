const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    dueDate: String,
    reminder: String,
    subTask: String,
    note: String,
    file: String
});

module.exports = mongoose.model('Task',taskSchema);