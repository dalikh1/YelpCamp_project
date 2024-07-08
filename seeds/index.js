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
            author: '66884d075567b7327c6732fd',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            description: '32232323232....hola hola w ya jamila inti arbiya wala sbanyoura tebghi el hata w tebghi el banyoula',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dgndhkwy6/image/upload/v1720435245/YelpCamp/alrqkjbk3tl5xquxw9ag.jpg',
                    filename: 'YelpCamp/alrqkjbk3tl5xquxw9ag'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})