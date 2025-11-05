import PetRow from './PetRow';

function PetTable({ pets, onDelete, onEdit }) {
  
    return (
        <div className="collection-container">
             <table>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet) => <PetRow pet={pet} 
                        onEdit={() => onEdit(pet)} onDelete={onDelete} key={pet._id} />)}
                </tbody>
            </table>
       </div>

    );
}

export default PetTable;