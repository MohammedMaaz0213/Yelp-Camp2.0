const mongoose = require('mongoose');
const campground = require('../models/campground');
const campground = require('../models/campground');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/yelp-camp' ,{
    useNewUrlParser: true,
    
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error' ,     console.error.bind(console, "connection  errrrrorrrr"));
db.once("open",     ()=>{
    console.log("DATABASE CONNECTED");
})

const   sample = (array) => array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});

    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const campground = new Campground({
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:campground.image,
            description:'Loren loren loren  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro atque maxime cum at. Consequatur eum unde molestiae consequuntur exercitationem reiciendis dolor ab. Repellat, exercitationem veritatis rem harum nihil optio modi.',
            price:campground.price
        }) 
        await campground.save();

    }
}   


seedDB().then(()=>{
    mongoose.connection.close();
});