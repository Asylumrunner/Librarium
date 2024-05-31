import { useDispatch } from "react-redux"
import { removeCurrentItem } from "../store"
import { useRemoveFromCollectionMutation } from "../store"
import FieldNames from "../models/fieldNames"

function DetailsView({item}) {
    const dispatch = useDispatch()
    const [removeItem, result] = useRemoveFromCollectionMutation()

    const handleDeleteItem = () => {
        removeItem({
            media_type: item.media_type, 
            key: item.guid
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

    return (<div className="flex flew-row">
        <div className="basis-1/2">
        <img src={item.img_link} className="object-scale-down h-96 w-192"/>
        </div>
        <div className="basis-1/2">
            {details}
            <button onClick={() => {dispatch(removeCurrentItem())}}>Back</button>
            <button onClick={handleDeleteItem}>Remove From Collection</button>
        </div>
    </div>)
}

export default DetailsView