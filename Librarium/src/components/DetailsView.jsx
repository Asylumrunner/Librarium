import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { removeCurrentItem } from "../store"
import { useRemoveFromCollectionMutation, usePutInCollectionMutation, useEditItemInCollectionMutation } from "../store"
import FieldNames from "../models/fieldNames"

function DetailsView({item}) {
    const dispatch = useDispatch()
    const [removeItem, removeResult] = useRemoveFromCollectionMutation()
    const [addItem, addResult] = usePutInCollectionMutation()
    const [editItem, editResult] = useEditItemInCollectionMutation()
    const [editModeEnabled, setEditModeEnabled] = useState(false)
    const [inputFields, setInputFields] = useState(item)
    const relevantFields = Object.keys(FieldNames)
        .filter((field) => Object.keys(item).includes(field))

    const { inCollection } = useSelector((state) => {
        return state.currentItem
    })
    

    const handleDeleteItem = () => {
        removeItem({
            key: item.guid
        })
    }

    const handleAddItem = () => {
        addItem({
            data: item
        })
    }

    const handleEditField = (index, event) => {
        var data = {...inputFields}
        data[index] = event.target.value
        setInputFields(data)
    }

    const toggleEditMode = () => {
        setInputFields(item)
        setEditModeEnabled(!editModeEnabled)
    }

    const handleEditSubmit = (event) => {
        event.preventDefault()
        //TODO: This sucks lol, fix it later
        var trimmedData = {...inputFields}
        var guid = trimmedData.guid
        delete trimmedData.guid
        delete trimmedData.date_inserted
        delete trimmedData.date_updated
        editItem({
            guid: guid,
            data: trimmedData
        })
    }

    const details = relevantFields.map((key) => {
            return (<div key={key}>
                <div>{FieldNames[key]}</div>
                <div>{item[key]}</div>
                <br />
            </div>)
    })

    const editPane = (<form id="edit" onSubmit={handleEditSubmit}>
        {relevantFields.map((fieldKey => {
            return (<div key={fieldKey}>
                <div>{FieldNames[fieldKey]}</div>
                <input value={inputFields[fieldKey]} onChange={event => handleEditField(fieldKey, event)}></input>
            </div>)
        }))}
        <button form="edit" type="submit">Submit Edits</button>
    </form>)

    const removeButton = <button onClick={handleDeleteItem}>Remove From Collection</button>
    const addButton = <button onClick={handleAddItem}>Add To Collection</button>

    return (<div className="flex flew-row">
        <div className="basis-1/2">
        <img src={item.img_link} className="object-scale-down h-96 w-192"/>
        </div>
        <div className="basis-1/2">
            {editModeEnabled ? editPane : details}
            <button onClick={() => {dispatch(removeCurrentItem())}}>Back</button>
            <button onClick={toggleEditMode}>{editModeEnabled ? "Cancel Edit" : "Edit Entry"}</button>
            { inCollection ? removeButton : addButton }
        </div>
    </div>)
}

export default DetailsView