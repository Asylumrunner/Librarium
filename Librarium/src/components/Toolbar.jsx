import MediaTypes from "../models/mediaTypes"
import { useSelector, useDispatch } from "react-redux"
import { changeMediaType } from "../store"

function Toolbar() {
    const dispatch = useDispatch()

    const { selectedMediaTypes } = useSelector((state) => {
        return state.dataFilter
    })

    const handleMediaToggle = (media) => {
        dispatch(changeMediaType(media))
    }

    const media_types = MediaTypes.map(mediaType => {
        return (<div key={mediaType}>
            <input 
                type="checkbox"
                id={mediaType}
                value={mediaType}
                checked={selectedMediaTypes[mediaType]}
                onChange={() => {handleMediaToggle(mediaType)}}
            />  {mediaType}
        </div>)
    })
    return (<div className="flex flex-row">{media_types}</div>)
}

export default Toolbar