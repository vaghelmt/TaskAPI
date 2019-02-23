const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Task = require('./models/task');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/task-api?gssapiServiceName=mongodb")
.then(()=>{
    console.log("connected to database");

})
.catch(()=>{
    console.log("connection unsuccessful");
});

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:false}));

app.post('/api/tasks',(req,res,next)=>{
    console.log("inside function");
    const task = new Task({
        title: req.body.title,
        dueDate: req.body.date,
        reminder: req.body.reminder,
        subTask: req.body.subtask,
        note: req.body.note,
        file: req.body.file
    });
    console.log(task);
    task.save();
    res.status(201).json({
        message: "Task added successfully"
    });

});

app.get('/api/tasks',(req,res,next)=>{
    Task.find()
        .then(documents=>{
            res.status(200).json({
                message:"Tasks fetched successfully",
                Tasks: documents
            })
        });

});
// app.use('/api/task',(req,res,next)=>{
//     const tasks = [
//     {
//         'Name':'to go to TD',
//         'Date':'today'
//     },
//     {
//         'Name':'to go to sigma',
//         'Date':'today'
//     }
//     ];

//     res.status(200).json(tasks);
// });

module.exports = app;