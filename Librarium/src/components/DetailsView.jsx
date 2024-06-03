import { useDispatch, useSelector } from "react-redux"
import { removeCurrentItem } from "../store"
import { useRemoveFromCollectionMutation, usePutInCollectionMutation } from "../store"
import FieldNames from "../models/fieldNames"

function DetailsView({item}) {
    const dispatch = useDispatch()
    const [removeItem, removeResult] = useRemoveFromCollectionMutation()
    const [addItem, addResult] = usePutInCollectionMutation()

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

    const details = Object.keys(FieldNames)
        .filter((field) => Object.keys(item).includes(field))
        .map((key) => {
            return (<div key={key}>
                <div>{FieldNames[key]}</div>
                <div>{item[key]}</div>
                <br />
            </div>)
    })

    console.log(item)
    const removeButton = <button onClick={handleDeleteItem}>Remove From Collection</button>
    const addButton = <button onClick={handleAddItem}>Add To Collection</button>

    return (<div className="flex flew-row">
        <div className="basis-1/2">
        <img src={item.img_link} className="object-scale-down h-96 w-192"/>
        </div>
        <div className="basis-1/2">
            {details}
            <button onClick={() => {dispatch(removeCurrentItem())}}>Back</button>
            { inCollection ? removeButton : addButton }
        </div>
    </div>)
}

export default DetailsView