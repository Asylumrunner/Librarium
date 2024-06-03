import { useDispatch } from "react-redux"
import { setCurrentItem } from "../store"

function GridCell({item, mediatype, inCollection}) {
    const dispatch = useDispatch()

    return (<div>
        <img src={item.img_link} className="object-scale-down h-48 w-96"/> <br/>
        <div>
            {item.title}
        </div>
        <button onClick={() => {dispatch(setCurrentItem({item, inCollection}))}}>Expand</button>
    </div>)
}

export default GridCell