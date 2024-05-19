import { useDispatch } from "react-redux"
import { setCurrentItem } from "../store"

function GridCell({item, mediatype}) {
    const dispatch = useDispatch()

    return (<div>
        <img src="https://picsum.photos/125" /> <br/>
        <div>
            {item.name}
        </div>
        <div>
            {mediatype}
        </div>
        <button onClick={() => {dispatch(setCurrentItem(item))}}>Expand</button>
    </div>)
}

export default GridCell