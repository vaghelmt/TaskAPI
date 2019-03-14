const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    dueDate: Date,
    reminderDate: Date,
    subTask: Array,
    note: String,
    file: String
});

module.exports = mongoose.model('Task',taskSchema);