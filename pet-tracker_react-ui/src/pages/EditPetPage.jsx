import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditPetPage = ({ petToEdit }) => {

    const [name, setName] = useState(petToEdit.name);
    const [species, setSpecies] = useState(petToEdit.species);
    const [breed, setBreed] = useState(petToEdit.breed);
    const [sex, setSex] = useState(petToEdit.sex);
    const [dob, setDob] = useState(petToEdit.dob);
    const [weight, setWeight] = useState(petToEdit.weight);

    const navigate = useNavigate()

    const editPet = async (e) => {
        e.preventDefault()
        const editedPet = { name, species, breed, sex, dob, weight };
        const response = await fetch(
            `/pets/${petToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedPet),
            headers: { 'Content-Type': 'application/json'}
        });
        if(response.status === 200){
            alert("Successfully Edited Pet Information!");
        } else {
            alert(`Failed to edit pet information. Status code = ${response.status}`);
        }
        navigate(`/myPets/${petToEdit._id}`);

    };

    return (
        <div>
            <br/>
            <button id="back" onClick={() => navigate(`/myPets/${petToEdit._id}`)}>
                Back
            </button>
            <h2>Edit Pet Information</h2>
            <form>
                <fieldset>
                     <legend>Pet Information</legend>
                        <label htmlFor="name">Name: </label>
                            <input type="text" id="name" value={name} required
                            onChange={e => setName(e.target.value)} />
                            <span> (required) </span>
                        <br/>
                            <label htmlFor="species">Species: </label>
                            <input type="text" id="species" value={species}
                            onChange={e => setSpecies(e.target.value)} />
                        <br/>
                        <label htmlFor="breed">Breed: </label>
                            <input type="text" id="breed" value={breed}
                            onChange={e => setBreed(e.target.value)} />
                        <br/>
                            <label htmlFor="sex">Sex: </label>
                            <select id="sex" value={sex} 
                            onChange={e => setSex(e.target.value)}>
                            <option value="" disabled>Select One</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            </select>
                        <br/>
                            <label htmlFor="dob">Date of Birth: </label>
                            <input type="text" id="dob" value={dob} placeholder="MM-DD-YY"
                            onChange={e => setDob(e.target.value)} />
                        <br/>
                         <label htmlFor="weight">Weight: </label>
                            <input type="number" id="weight" value={weight}
                            onChange={e => setWeight(e.target.valueAsNumber)} />
                            <span> lbs </span>
                        <br/>
                </fieldset>
                <br/>
                <button
                    onClick={editPet}
                >Save Changes</button>
            </form>
        </div>
        
    );
}

export default EditPetPage;