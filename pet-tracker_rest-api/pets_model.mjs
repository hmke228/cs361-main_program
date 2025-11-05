import mongoose from 'mongoose';
import 'dotenv/config';

const PET_DB_NAME = 'pet_db';
const PET_COLLECTION = 'pets';
const PET_CLASS = 'Pet'

let connection = undefined;

async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: PET_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

const petSchema = mongoose.Schema({
    name: {type: String, required: true},
    species: {type: String},
    breed: {type: String},
    sex: {type: String},
    dob: {type: String},
    weight: {type: Number}
}, {collection: 'pets'}
);

const Pet = mongoose.model(PET_CLASS, petSchema);

/**
 * Create a new pet
 * @param {String} name
 * @param {String} species 
 * @param {String} breed 
 * @param {String} sex
 * @param {Date} dob
 * @param {Number} weight
 */
const createPet = async (name, species, breed, sex, dob, weight) => {
    const pet = new Pet({ name: name, species: species, breed: breed, sex: sex, dob: dob, weight: weight });
    return pet.save();
}

const findPets = async () => {
    const fullList = Pet.find();
    return fullList.exec();
}

const searchById = async (_id) => {
    const result = await Pet.findById(_id);
    return result;
}

async function updatePet(_id, newValues){
    const categories = {};
    if (newValues.name !== undefined) {
        categories.name = newValues.name;
    }
    if (newValues.species !== undefined) {
        categories.species = newValues.species;
    }
    if (newValues.breed !== undefined) {
        categories.breed = newValues.breed;
    }
    if (newValues.sex !== undefined) {
        categories.sex = newValues.sex;
    }
    if (newValues.dob !== undefined) {
        categories.dob = newValues.dob;
    }
    if (newValues.weight !== undefined) {
        categories.weight = newValues.weight;
    }
    await Pet.updateOne({_id: _id}, categories)
    return _id
}

const deleteById = async (_id) => {
    const result = await Pet.deleteOne({_id: _id});
    return result.deletedCount;
}


export { connect, createPet, findPets, searchById, updatePet, deleteById };