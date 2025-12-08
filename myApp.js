require('dotenv').config();
const mongoose = require('mongoose');

// #1 Install and Set Up Mongoose
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Événements de connexion pour vérifier
mongoose.connection.on('connected', () => {
  console.log('✅ Connecté à MongoDB Atlas avec succès!');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ Erreur de connexion:', err.message);
});

// 2. Create a Model
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

// 3. Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Ayoub',
    age: 26,
    favoriteFoods: ['Tajin', 'Cosscouss', 'Harira']
  });
  
  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// 4. Create Many Records with model.create()
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

// 5. Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return done(err);
    done(null, personFound);
  });
};

// 6. Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, singleFood) => {
    if (err) return done(err);
    done(null, singleFood);
  });
};

// 7. Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// 8. Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = 'Tanjia';

  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    
    person.favoriteFoods.push(foodToAdd);
    
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

// 9. Perform New Updates on a Document Using model.findOneAndUpdate()
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

// 10. Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// 11. Delete Many Documents with model.remove()
// NOTE: Dans Mongoose 5.x, on utilise deleteMany() au lieu de remove()
const removeManyPeople = (done) => {
  const nameToRemove = 'Karim';

  Person.deleteMany({ name: nameToRemove }, (err, dataToremove) => {
    if (err) return done(err);
    done(null, dataToremove);
  });
};

// 12. Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = 'rfissa';

  Person.find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(2)
    .select(['name', 'favoriteFoods']) // Correction: 'favoriteFoods' pas 'favouriteFoods'
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

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