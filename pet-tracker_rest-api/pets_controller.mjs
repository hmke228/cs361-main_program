import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as pets from './pets_model.mjs';

const PORT = process.env.PORT;

const ERROR_INVALID_REQ = {Error: 'Invalid request'};
const ERROR_NOT_FOUND = {Error: "Not found"};

const app = express();
app.use(express.json());

app.listen(PORT, async () => {
    await pets.connect()
    console.log(`Server listening on port ${PORT}...`);
});


/**
Validates DOB entry
*/
function isDobValid(dob) {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(dob);
}

/**
Validates request body
 */
function isValid(req){
    if (!req.body.name) {
        return false;
    }
    if (typeof req.body.name !== "string" || req.body.name.length < 1) {
        return false;
    }
    if (req.body.species && typeof req.body.species !== "string") {
        return false;
    }
    if (req.body.breed && typeof req.body.breed !== "string") {
        return false;
    }
      if (req.body.sex && typeof req.body.sex !== "string") {
        return false;
    }
      if (req.body.dob && (typeof req.body.dob !== "string" || !isDobValid(req.body.dob))) {
        return false;
    }
      if (req.body.weight && (typeof req.body.weight !== "number" || req.body.weight <= 0)) {
        return false;
    }
    return true
}

app.post('/pets', asyncHandler(async (req, res) => {
    if (!isValid(req)) {
        return res.status(400).json(ERROR_INVALID_REQ)
    }
    const pet = await pets.createPet(req.body.name, 
                            req.body.species, 
                            req.body.breed,
                            req.body.sex,
                            req.body.dob,
                            req.body.weight);
        return res.status(201).json(pet);
    }
));

app.get('/pets', asyncHandler(async (req, res) => {
    const allPets = await pets.findPets();
    return res.json(allPets);
    }
));

app.get('/pets/:id', asyncHandler(async (req, res) => {
    const petId = req.params.id;
    const foundPet = await pets.searchById(petId);
    if (!foundPet) {
        return res.status(404).json(ERROR_NOT_FOUND);
    }
    else {
        return res.json(foundPet);
    }
}));

app.put('/pets/:id', asyncHandler(async (req, res) => {
    const petId = req.params.id;
    const updates = req.body;
    const foundPet = await pets.searchById(petId);
    if (!isValid(req)){
        return res.status(400).json(ERROR_INVALID_REQ)
    }
    if (!foundPet) {
        return res.status(404).json(ERROR_NOT_FOUND);
    }
    else {
        const idOfUpdated = await pets.updatePet(petId, updates);
        const updatedPet= await pets.searchById(idOfUpdated)
        return res.json(updatedPet);
    }
}));

app.delete('/pets/:id', asyncHandler(async (req, res) => {
    const petId = req.params.id;
    const foundPet = await pets.searchById(petId);
    if (!foundPet) {
        return res.status(404).json(ERROR_NOT_FOUND);
    }
    else {
        await pets.deleteById(petId);
        return res.status(204).send();
    }
}));