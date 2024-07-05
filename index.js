const express = require('express');
const dotenv = require('dotenv')
const data = require('./data.js')
const app = express();
// import 'dotenv/config'
// const DB = require("./config").get(process.env.node_env).DB;
const PORT = process.env.PORT || 8000;

const jokeMiddleware = (req, res, next) => {
    req.joke = "This is a joke";
    console.log('Middleware triggered');
    next();
};
const imageMiddleware = (req,res,next) => {
    console.log("Image middleware triggered")
    next()
}

app.get('/jokes', jokeMiddleware, (req, res) => {
    const randomIndex = Math.floor(Math.random() * data.jokes.length);
    return res.status(200).json(data.jokes[randomIndex]);
});

app.get('/joke/:jokeId', (req, res) => {
    const jokeId = Number(req.params.jokeId);
    if (isNaN(jokeId) || jokeId < 0) {
        return res.status(400).json({ error: "Invalid joke id" })
    }
    const joke = data.jokes.find(joke => joke.id === jokeId);
    if(!joke){
        return res.status(404).json({error:"joke not found"})
    }
   return res.status(200).json(joke)
})


app.get('/images',imageMiddleware,(req,res) =>{
    const randomIndex = Math.floor(Math.random() * data.images.length);
    return res.status(200).json(data.images[randomIndex])
});

app.get('/image/:imageId', (req, res) => {
    const imageId = Number(req.params.imageId);
    if (isNaN(imageId) || imageId < 0) {
        return res.status(400).json({ error: "Invalid image id" });
    }
    const image = data.images.find(image => image.id === imageId);
    if (!image) {
        return res.status(404).json({ error: "Image not found" });
    }
    return res.status(200).json(image);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})