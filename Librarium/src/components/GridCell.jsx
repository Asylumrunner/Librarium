import { useDispatch } from "react-redux"
import { setCurrentItem } from "../store"

function GridCell({item, mediatype, inCollection}) {
    const dispatch = useDispatch()

    return (<div className="bg-purple-100 w-124 h-170">
        <img src={item.img_link} onClick={() => {dispatch(setCurrentItem({item, inCollection}))}} className="drop-shadow-2xl h-full w-full aspect-auto object-center object-cover"/>
    </div>)
}

export default GridCell