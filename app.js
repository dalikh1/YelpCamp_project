const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app =express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req,res) => {
    res.render('Home')
})

app.get('/campgrounds', async (req,res) => {
    const campgrounds = await campground.find({});
    res.render('campgrounds/index', { campgrounds })
})

app.listen(3000, () => {
    console.log('serving on port 3000')
} )