require('dotenv').config();
const mongoose = require('mongoose');

// 1. Connect to MongoDB Atlas
console.log('🔗 Connecting to MongoDB Atlas...');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
});

// Connection events
mongoose.connection.on('connected', () => {
  console.log('✅ Successfully connected to MongoDB Atlas!');
  console.log('📊 Database:', mongoose.connection.db.databaseName);
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message);
  console.log('💡 Check your .env file and network connection');
});

// 2. Person Schema and Model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

// 3. FreeCodeCamp Functions

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Ayoub',
    age: 26,
    favoriteFoods: ['Tajin', 'Couscous', 'Harira']
  });
  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  { name: 'Ayoub', age: 27, favoriteFoods: ['tajin goat'] },
  { name: 'Monia', age: 36, favoriteFoods: ['tanjia bgri'] },
  { name: 'Kamal', age: 48, favoriteFoods: ['cousscouss tfaya'] }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return done(err);
      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return done(err);
    done(null, removedDoc);
  });
};

// ✅ CRITICAL: This must use Model.remove() for FreeCodeCamp tests
const removeManyPeople = (done) => {
  const nameToRemove = "Karim";
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "rfissa";
  Person.find({ favoriteFoods: foodToSearch })
    .sort("name")
    .limit(2)
    .select(["name", "favoriteFoods"])
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};

// 4. Exports for FreeCodeCamp
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

// 5. Keep the app running for testing
console.log('🚀 MongoDB FreeCodeCamp application loaded');
console.log('📁 Database: mongodbatlas');
console.log('👤 Using model: Person');