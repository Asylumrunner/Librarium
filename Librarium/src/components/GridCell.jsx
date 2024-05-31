import { useDispatch } from "react-redux"
import { setCurrentItem } from "../store"

function GridCell({item, mediatype}) {
    const dispatch = useDispatch()

    return (<div>
        <img src={item.img_link} className="object-scale-down h-48 w-96"/> <br/>
        <div>
            {item.title}
        </div>
        <div>
            {mediatype}
        </div>
        <button onClick={() => {dispatch(setCurrentItem(item))}}>Expand</button>
    </div>)
}

export default GridCell