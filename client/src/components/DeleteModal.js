import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
/*
    This modal is shown when the user asks to delete a list. Note 
    that before this is shown a list has to be marked for deletion,
    which means its id has to be known so that we can retrieve its
    information and display its name in this modal. If the user presses
    confirm, it will be deleted.
    
    @author McKilla Gorilla
*/
function DeleteModal() {
    const { store } = useContext(GlobalStoreContext);


    let listName = "";
    let index = 0;
    for (let i = 0; i < store.idNamePairs.length; i++) {
        if (store.idNamePairs[i]._id === store.listMarkedForDeletion) {
            index = i;
            console.log(i);
            break;
        }
    }
    /*console.log(store.idNamePairs);
    listName = store.idNamePairs[index];
    console.log(listName);
    //listName = listName.name;*/
    if (store.currentList) {
        listName = store.currentList.name;
    }
    function handleDeleteList(event) {
        document.getElementById("delete-modal").setAttribute("class", "modal");
        store.deleteMarkedList(store.listMarkedForDeletion);
    }
    function handleCloseModal(event) {
        document.getElementById("delete-modal").setAttribute("class", "modal");
    }
    return (
        <div
            className="modal"
            id="delete-modal"
            data-animation="slideInOutLeft">
            <div className="modal-dialog">
                <header className="dialog-header">
                    Delete the {listName} Top 5 List?
                </header>
                <div id="confirm-cancel-container">
                    <button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleDeleteList}
                    >Confirm</button>
                    <button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;