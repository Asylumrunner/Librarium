import { useDispatch } from "react-redux"
import { removeCurrentItem } from "../store"
import { useRemoveFromCollectionMutation } from "../store"

function DetailsView({item}) {
    const dispatch = useDispatch()
    const [removeItem, result] = useRemoveFromCollectionMutation()

    const handleDeleteItem = () => {
        removeItem({
            media_type: item.mediatype, 
            key: item.guid
        })
    }

    const details = Object.keys(item).map((key) => {
        return (<div id={key}>
            <div>{key}</div>
            <div>{item[key]}</div>
            <br />
        </div>)
    })

    return (<div className="flex flew-row">
        <div className="basis-1/2">
        <img src="https://picsum.photos/450" />
        </div>
        <div className="basis-1/2">
            {details}
            <button onClick={() => {dispatch(removeCurrentItem())}}>Back</button>
            <button onClick={handleDeleteItem}>Remove From Collection</button>
        </div>
    </div>)
}

export default DetailsView