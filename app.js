const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Task = require('./models/task');
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

//connect to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/task-api?gssapiServiceName=mongodb")
.then(()=>{
    console.log("connected to database");
})
.catch(()=>{
    console.log("connection unsuccessful");
});

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
app.post('/api/tasks/:id',(req,res,next)=>{
    console.log("inside function");
    Task.updateOne({_id:req.params.id},req.body,function(err){
        if(!err){
            res.status(204).send();
        }else{
            res.status(400).send(err);
        }
        
    });
});


//add a subtask
app.post('/api/update/subtask/:id',(req,res,next)=>{
    let updatedSubTask;
    console.log(req.body);
    Task.findById(req.params.id,function(err,task){
        //req.body.subTask.push(task.subTask);
        updatedSubTask = task.subTask;
        updatedSubTask.push(req.body.subTask);
        req.body.subTask = _.flattenDeep(updatedSubTask);
        //console.log( req.body.subTask);
        //console.log(req.body);
        Task.updateOne({_id:req.params.id},req.body,function(err){
            if(!err){
                res.status(204).send();
            }else{
                res.status(400).send(err);
            }
        });
    })

});

module.exports = app;