const snippets =  [
    {
        id : Math.random().toString(),
        name : "Logger config. for JAVA",
        filename : "log4j.properties",
        lang : "properties",
        snippet : `log4j.rootLogger=INFO, consoleAppender, fileAppender
        
log4j.appender.consoleAppender=org.apache.log4j.ConsoleAppender
log4j.appender.consoleAppender.layout=org.apache.log4j.PatternLayout
log4j.appender.consoleAppender.layout.ConversionPattern=[%5p] %d %-15t %c [%L] %m%n

log4j.appender.fileAppender=org.apache.log4j.FileAppender
log4j.appender.fileAppender.file=logs/app-log.txt
log4j.appender.fileAppender.layout=org.apache.log4j.PatternLayout
log4j.appender.fileAppender.layout.ConversionPattern=[%5p] %d %-15t %c [%L] %m%n

#log4j.logger.com.targetindia=all`
    },

    {
        id : Math.random().toString(),
        name : "General CSS",
        filename : "general.css",
        lang : "css",
        snippet : `* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html {
    /* font-size: 10px; */
    /* 10px / 16px = 0.625 = 62.5% */
    /* Percentage of user's browser font-size setting */
    font-size: 62.5%;
    overflow-x: hidden;

    /* Does NOT work on Safari */
    scroll-behavior: smooth;
}

body {
    font-family: "Rubik", sans-serif;
    line-height: 1;
    font-weight: 400;
    color: #555;
}`
    },
    {
        id : Math.random().toString(),
        name : "NodeJS script.js",
        lang : "javascript",
        filename : "server.js",
        snippet : `const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({path:"./config.env"})

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
    })


app.get("/",(req,res)=>{
    res.send("Hi, wellcome to my chathub..")
})
const port = Number(process.env.PORT) || 8080;
app.listen(port,()=>{
    console.log("Server is running");
})`
    },
    {
        id : Math.random().toString(),
        name : "NodeJS app.js",
        lang : "javascript",
        filename : "app.js",
        snippet :`const express = require("express");

const userRouter = require("./routes/userRoutes");
const cors = require('cors');

const app = express();

//middleware...
app.use(express.json());
app.use(cors());

//Routes...
app.use("/api/user",userRouter);


module.exports = app;`
    },
    {
        id : Math.random().toString(),
        name : "NodeJS userRoutes.js",
        lang : "javascript",
        filename : "userRoutes.js",
        snippet :`const router = require("express").Router();
const userController = require("../controllers/userController")

//update user...
router.route("/:id").put(userController.updateUser);

//delete user...
router.route("/:id").delete(userController.deleteUser);


//get user...
router.route("/:id").get(userController.getUser);

module.exports = router;`
    },
    {
        id : Math.random().toString(),
        name : "NodeJS UserModel.js",
        lang : "javascript",
        filename : "UserModel.js",
        snippet :`const mongoose = require("mongoose");

//user schema..
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        max:30,
        min:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:30
    },
    password:{
        type: String,
        min:6,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type: String,
        default:""
    },
    followers:{
        type: Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        max:50,
    }, 
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:String,
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("user",userSchema);`
    },
    {
        id : Math.random().toString(),
        name : "NodeJS userController.js",
        lang : "javascript",
        filename : "userController.js",
        snippet : `const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt")

exports.updateUser = async (req, res)=>{
    if(req.body.id === req.params.id){
        try{
            if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
        }catch(err){
            return res.status(500).json({
                status:"fail",
                message:"",
                error:err
            })
        }
        try{
            const user = await userModel.findByIdAndUpdate(req.params.id,{$set: req.body});
            res.status(200).json({
                status:"success",
                message:"Account has been updated!"
            })

        }catch(err){
            return res.status(400).json({
                status:"fail",
                message:"",
                error:err
            });
        }
    }else{
        return res.status(403).json({
            status:"fail",
            message:"You can update only your account."
        })
    }
}
    
exports.deleteUser = async (req, res)=>{
    if(req.body.id === req.params.id){
        try{
            await userModel.findByIdAndDelete(req.params.id);
            res.status(200).json({
                status:"success",
                message:"Your account has been deleted!"
            })
        }catch(err){
            return res.status(400).json({
                status:"fail",
                message:"",
                error:err
            });
        }
    }else{
        return res.status(403).json({
            status:"fail",
            message:"You can delete only your account."
        })
    }

}

exports.getUser = async (req, res)=>{
    try{
        const user = await userModel.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json({
            status:"success",
            user:other
        })
    }catch(err){
        res.status(404).json({
            status:"fail",
            message:"Invalid user"
        })
    }
} `
    },
    {
        id : Math.random().toString(),
        name : "Maven pom.xml",
        lang : "xml",
        filename : "pom.xml",
        snippet :`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>TARGET-JAVA-TRAINING</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.26</version>
            <scope>provided</scope>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-api -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>2.0.7</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.slf4j/slf4j-reload4j -->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-reload4j</artifactId>
            <version>2.0.7</version>
        </dependency>

    </dependencies>
</project>`
    }

]

export default snippets;