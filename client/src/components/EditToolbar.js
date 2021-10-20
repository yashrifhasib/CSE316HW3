import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let buttonClassUndo = "top5-button";
    let buttonClassRedo = "top5-button";
    let buttonClassClose = "top5-button";
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }
    if (store.currentList == null) {
        buttonClassUndo = "top5-button-disabled";
        buttonClassRedo = "top5-button-disabled";
        buttonClassClose = "top5-button-disabled";
    }
    else {
        if (store.hasUndo()) {
            buttonClassUndo = "top5-button";
        }
        else {
            buttonClassUndo = "top5-button-disabled";
        }
        if (store.hasRedo()) {
            buttonClassRedo = "top5-button";
        }
        else {
            buttonClassRedo = "top5-button-disabled";
        }
        
    }
    return (
        <div id="edit-toolbar">
            <div
                disabled={editStatus}
                id='undo-button'
                onClick={handleUndo}
                className={buttonClassUndo}>
                &#x21B6;
            </div>
            <div
                disabled={editStatus}
                id='redo-button'
                onClick={handleRedo}
                className={buttonClassRedo}>
                &#x21B7;
            </div>
            <div
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                className={buttonClassClose}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;