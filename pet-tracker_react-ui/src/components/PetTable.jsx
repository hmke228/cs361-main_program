import { Link } from 'react-router-dom';

function PetTable({ pets }) {

    const noPets = () => {
        if (pets.length === 0) {
            return true;
        }
        return false;
        };
    
    return (
        <div className="collection-container">
             <table>
                <thead>
                    <tr>
                        <th>Select a pet to view their profile.</th>
                    </tr>
                </thead>
                <tbody>
                    { noPets() ? (
                        <tr>
                            <td>No Pets to Show</td>
                        </tr>
                    ) : ( 
                        pets.map(pet => (
                            <tr key={pet._id}>
                                <td>
                                    <Link to={`/myPets/${pet._id}`}>{pet.name}</Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
       </div>
    );
};


export default PetTable;