const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Item = require('../model/Item')
const dotenv = require('dotenv').config()
const db = mongoose.connection;

mongoose.connect(process.env.DB,{useNewUrlParser : true, useUnifiedTopology : true,useFindAndModify : false})


db.once('open',(err) => console.log("Connected to the database..."))

router.get('/items',(req,res) => {
    const nameToFind = req.query.name;
    if(!nameToFind) {
        Item.find({},(err,docs) => {
            if(err) console.log(err)
            if(!docs) {
                res.status(404).json({
                    error : true,
                    message : "No documents found to retrieve."
                })
            } else {
                res.status(200).json({
                    error : false,
                    message : "All documents retrieved.",
                    items : docs
    
                })
            }
        })
    } else {
        Item.findOne({name : nameToFind},(err,item) => {
            if(err) console.log(err)
            if(!item) {res.status(400).json({
                error : true,
                message : `No item with name ${nameToFind} was found.`
            })} else {
                res.status(200).json({
                    error : false,
                    message : "Item found in the database.",
                    item
                })
            }
        })
    }
    
})

router.post('/new',async (req,res) => {
    const {name} = req.body;
    if(!name) {
        res.status(400).json({
            error : true,
            message : "No name provided."
        })
    } else {
        await Item.findOne({name},async (err, todo) => {
            if(err) console.log(err)
            if(!todo) {
                const insertTodo = new Item({
                    name,
                    completed : false
                })
                await insertTodo.save((err, doc) => {
                    if(err) {
                        console.log(err)
                        return;
                    }
                     res.json({
                        error : false,
                        message : "Inserted",
                        doc : doc
                    })
                    
                })
            } else {
                res.json({
                    error : false,
                    message : "Item already exists.",
                })
            }
        })
    }

    
})

router.delete('/items',(req,res) => {
    const nameToDel = req.query.name;
    if(!nameToDel) {
        Item.remove({},(err,items) => {
            
            res.status(201).json({
                error : false,
                message : "All items deleted."
            })
        })
    }
    else {
        Item.findOneAndDelete({name : nameToDel},(err,item) => {
            
            if(err) console.log(err)
            if(!item) {res.status(400).json({error : true,message : "No item found by that name."})}
            else {
                res.status(201).json({
                    error : false,
                    message : "Item successfully deleted."
                })
            }
            
        })
    }
})

router.put('/items',async (req,res) => {
    const name = req.query.name
    const updatedName = req.query.updatedName
    const completed = req.query.completed
    if(!name) res.status(400).json({error : true,message : "No name provided."})

    Item.findOne({name : name}, async (err,doc) => {
        if(err) console.log(err)
        if(!doc) {
            res.status(400).json({
                error : true,
                message : "Item not found."
            })
        } else {
            if(!updatedName && completed) {
                const update = {
                    completed : completed
                }
                await Item.findOneAndUpdate({name},update,{new : true},(err,item) => {
                    if(err) console.log(err)
                    res.status(201).json({
                        error :false,
                        message : "Successfully updated todo-status."
                    })
                })
            }
            else if(!completed && updatedName) {
                const update = {
                    name : updatedName
                }
                await Item.findOneAndUpdate({name},update,{new : true},(err,item) => {
                    if(err) console.log(err)
                    res.status(201).json({
                        error :false,
                        message : "Successfully updated todo-name."
                    })
                })
            } else if(!updatedName && !completed) {
                res.status(400).json({
                    error : true,
                    message : "No fields to update."
                })
            } else if(updatedName && completed) {
                const update = {
                    name : updatedName,
                    completed
                }
                await Item.findOneAndUpdate({name},update,{new : true},(err,item) => {
                    if(err) console.log(err)
                    res.status(201).json({
                        error :false,
                        message : "Successfully updated status and name."
                    })
                })
            }
        }
    })

   
})


module.exports = router;