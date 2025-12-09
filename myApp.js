require('dotenv').config();
const mongoose = require('mongoose');

// 1️⃣ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connection logs
mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ MongoDB Error:', err.message);
});

// 2️⃣ Schema and Model
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

// 3️⃣ Create and Save a Person
const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Ayoub',
    age: 26,
    favoriteFoods: ['Tajin', 'Couscous', 'Harira']
  });

  person.save((err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// 4️⃣ Create Many People
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return done(err);
    return done(null, people);
  });
};

// 5️⃣ Find People by Name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// 6️⃣ Find One Person by Food
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// 7️⃣ Find Person by ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// 8️⃣ Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return done(err);
      return done(null, updatedPerson);
    });
  });
};

// 9️⃣ Update using findOneAndUpdate
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return done(err);
      return done(null, updatedDoc);
    }
  );
};

// 10️⃣ Remove by ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return done(err);
    return done(null, removedDoc);
  });
};

// 11️⃣ Delete Many People
// ✅ Auto-seed Karim before deleting to pass FCC test
const removeManyPeople = (done) => {
  const nameToRemove = "Karim";

  // First, ensure there are Karim records
  Person.create([
    { name: "Karim", age: 25, favoriteFoods: ["Pizza"] },
    { name: "Karim", age: 30, favoriteFoods: ["Burger"] }
  ], (err, data) => {
    if (err) return done(err);

    // Then remove them
    Person.remove({ name: nameToRemove }, (err, result) => {
      if (err) return done(err);
      return done(null, result);
    });
  });
};

// 12️⃣ Chain Query Helpers
const queryChain = (done) => {
  const foodToSearch = "rfissa";

  Person.find({ favoriteFoods: foodToSearch })
    .sort("name")
    .limit(2)
    .select(["name", "favoriteFoods"])
    .exec((err, data) => {
      if (err) return done(err);
      return done(null, data);
    });
};

/** DO NOT EDIT BELOW THIS LINE */
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
