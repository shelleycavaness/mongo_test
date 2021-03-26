'use strict';
const mongoose = require('mongoose');
{UserSchema, UserModel}

const connect = {
    host:'localhost',  //name of domaine or ip address
    port: 27017,
    dbName: 'catdb'
} 

//here we connect to the database
// mongoose.connect('mongodb://localhost:27017/bearsdb')
mongoose.connect('mongodb://' + connect.host + ':' + connect.port + '/' + connect.dbName);

//what are the errors associated with the database
// tell me when you have an error for connecting or disconnecting
mongoose.connection.on('error', err =>{
    console.log('conection error');
})

mongoose.connection.on('disconnected', err => {
    console.log('we are disconnected');
    process.exit(0)
});

mongoose.connection.on('connected', err => {
    console.log('YAAAaaaaaaYoo!');
})

process.on('SIGINT', err => {
    mongoose.connection.close( err =>{
        process.exit(0);
    })
})

//  DEFINE SCHEMA noSQL
console.log(Schema)
const UserSchema = new Schema ({
    name : String,
    mail :{
        type : String,
        required : true
    },
    hash:{
        type : String,
        required : true
    }
});  //in SQL equivalent to 'CREATE TABLE users (name TEST, mail TEXT NOT NULL hash NOT NULL )'

//what is the difference bwtn a schema and a model
// the schema creates the table or prototype a mold for a collection
//model will add methods- the real ODM is the model. you can really map with the model. 

//permits to define a set of methods accesseble for your collection or an item in the collect.
//UserModel.find is possible and not UserSchema.find
const UserModel = Model('Users', UserSchema)
const newUser = UserModel({
    name:'Maya',
    mail: 'maya@gmail',
    hash: 'DF345FGHJK'
})

UserModel
.find()
.then(data =>{
    console.log(data);
})













/*
const Human
{
    hair:'brown',
    wake: function..
}

const jean= new Human()
jean.hair;
jean
//ES6
jean.hair //or
{hair} =jean

*/










