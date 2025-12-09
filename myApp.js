require('dotenv').config();
const mongoose = require('mongoose');

console.log('🚀 Starting FreeCodeCamp MongoDB App...\n');

// URI alternative si .env ne marche pas
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://admin_user:eMgmB4pnHbrbpecj@cluster0.z3uoleu.mongodb.net/test?retryWrites=true&w=majority';

console.log('Connecting to:', mongoUri.substring(0, 50) + '...\n');

// Connexion
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB Atlas!');
  console.log('📊 Database:', mongoose.connection.name);
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Error:', err.message);
  console.log('\n🔧 Solution: Create a clean .env file with:');
  console.log("MONGO_URI='mongodb+srv://admin_user:eMgmB4pnHbrbpecj@cluster0.z3uoleu.mongodb.net/test?retryWrites=true&w=majority'");
});

// Schema et Model
const Person = mongoose.model('Person', new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
}));

// Fonctions FreeCodeCamp
const createAndSavePerson = (done) => {
  const person = new Person({ name: 'Test', age: 25, favoriteFoods: ['pizza'] });
  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  { name: 'Ayoub', age: 27, favoriteFoods: ['tajin goat'] },
  { name: 'Monia', age: 36, favoriteFoods: ['tanjia bgri'] }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return done(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, singleFood) => {
    if (err) return done(err);
    done(null, singleFood);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push('hamburger');
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, updatedDoc) => {
      if (err) return done(err);
      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ✅ CRITIQUE : removeManyPeople pour FreeCodeCamp
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result);
  });
};

// ✅ CRITIQUE : queryChain pour FreeCodeCamp
const queryChain = (done) => {
  Person.find({ favoriteFoods: 'burrito' })
    .sort('name')
    .limit(2)
    .select(['name', 'favoriteFoods'])
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};

// Exports
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

// Garder l'app en vie
console.log('\n🎯 FreeCodeCamp functions loaded');
console.log('👉 Test on: http://localhost:3000');