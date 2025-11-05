import '../App.css'

function ConfirmDelete({ prompt, onConfirm, onCancel }) {
    return (
    <div className="confirmation-box">
        <p>{prompt}</p>
        <button onClick={onConfirm}> Delete </button>
        <button onClick={onCancel}> Cancel </button>
    </div>
    );
};    

export default ConfirmDelete;