import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const [ editActive, setEditActive ] = useState(false);

    function handleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        let newName = event.target.value;
        if (event.code === "Enter") {
            let id = event.target.id.substring("item-".length).slice(5, 6);
            id = parseInt(id);
            let oldname = store.currentList.items[id - 1];
            store.currentList.items[id - 1] = newName;
            toggleEdit();
            store.addChangeItemTransaction(id - 1, oldname, newName);
            store.updateCurrentList();
        }
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("item", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    let { index } = props;
    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }


    let listElement = (
        <div
            id={'item-' + (index + 1)}
            className={itemClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            <input
                type="button"
                id={"edit-item-" + index + 1}
                className="list-card-button"
                onClick={handleEdit}
                value={"\u270E"}
            />
            {props.text}
        </div>);

    if (editActive) {
        return listElement = (
            <input
                id={"edit-item-" + (index + 1)}
                className='list-card'
                type='text'
                onKeyPress={handleKeyPress}
                defaultValue={document.getElementById('item-' + (index + 1)).innerHTML.split(">")[1]}
            />
        )        
    }
    return listElement;
}

export default Top5Item;