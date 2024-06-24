const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');



mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: 'https://img.freepik.com/free-photo/3d-car-with-vibrant-colors_23-2150796964.jpg?t=st=1719247284~exp=1719250884~hmac=82c6ed7cea8fcb9b5479cccae8ee388a6e9e609592862e2fb152519264e316e4&w=996',
            description: '32232323232....hola hola w ya jamila inti arbiya wala sbanyoura tebghi el hata w tebghi el banyoula',
            price 
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})