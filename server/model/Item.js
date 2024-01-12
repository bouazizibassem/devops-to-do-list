const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name : {type:String},
    completed : {type:Boolean,default:false},
    created_on : {type:Date,default : new Date()}
},{versionKey : false})


const Item = mongoose.model('Item',ItemSchema);

module.exports = Item