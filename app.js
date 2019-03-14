const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Task = require('./models/task');
const mongoose = require('mongoose');
const moment = require('moment');

mongoose.connect("mongodb://127.0.0.1:27017/task-api?gssapiServiceName=mongodb")
.then(()=>{
    console.log("connected to database");

})
.catch(()=>{
    console.log("connection unsuccessful");
});

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader(
//         "Access-Control-Allow-Header",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PATCH, DELETE, OPTIONS"
//     );
//     next();
// });

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:false}));


 //get all the tasks from the the database
 app.get('/api/tasks',(req,res,next)=>{
    console.log("inside get function");
    
    Task.find()
        .then(documents=>{
            res.status(200).json({
                message:"Tasks fetched successfully",
                Tasks: documents
            })
        })
        .catch((err)=>{
            res.status(404).send(err);
        });

});

//Create a new task
app.post('/api/tasks',(req,res,next)=>{
    console.log("inside function");
    const task = new Task({
        title: req.body.title,
        dueDate: moment(req.body.date),
        reminderDate: moment(req.body.reminder),
        subTask: req.body.subtask,
        note: req.body.note,
        file: req.body.file
    });
    console.log(task);
    task.save().then(()=>{
        res.status(201).json({
            message: "Task added successfully"
        });
    })
    .catch((err)=>{
        res.status(404).send(err);
    });


});

//get task by id
app.get('/api/tasks/:id',(req,res,next)=>{
    console.log("inside function");
    Task.findById(req.params.id,function(err,task){
        console.log(err);
        if(err===null){
            res.status(200).json(task);
        }else{
            res.status(400).json([]);
        }
        
    });
});

//update the task
app.get('/api/tasks/:id',(req,res,next)=>{
    console.log("inside function");
    Task.findById(req.params.id,function(err,task){
        console.log(err);
        if(err===null){
            res.status(200).json(task);
        }else{
            res.status(400).json([]);
        }
        
    });
});

module.exports = app;