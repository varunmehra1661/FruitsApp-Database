const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    
    rating: 2,
    review: "Solid fruit"
});

fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "John",
    age: 37
});

// person.save();


Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    }
    else {
        mongoose.connection.close();
        fruits.forEach(function (fruit) {
            console.log(fruit.name);
        });
    }
    
});

Person.deleteMany({name: "John"},function(err){
    if (err) {
        console.log(err);   
    }
    else{
        console.log("Deleted all the docs");
    }
});

const findDocuments = function (db, callback) {
    //get the doc clln
    const collection = db.collection('fruits');
    //find some docs
    collection.find({}).toArray(function (err, fruits) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits);
        callback(fruits);
    });
}
