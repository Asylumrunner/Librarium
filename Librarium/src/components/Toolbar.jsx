import MediaTypes from "../models/mediaTypes"
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux"
import { changeMediaType, setSearchTerm, setSortMode } from "../store"

function Toolbar() {
    const dispatch = useDispatch()

    const { selectedMediaTypes, searchTerm, sortMode } = useSelector((state) => {
        return state.dataFilter
    })

    const handleMediaToggle = (media) => {
        dispatch(changeMediaType(media))
    }

    const handleSearchChange = (event) => {
        dispatch(setSearchTerm(event.target.value))
    }

    const handleSortModeChange = (option) => {
        dispatch(setSortMode(option.value))
    }

    const media_types = Object.keys(MediaTypes).map(mediaType => {
        return (<div key={mediaType}>
            <input 
                type="checkbox"
                id={mediaType}
                value={mediaType}
                checked={selectedMediaTypes[mediaType]}
                onChange={() => {handleMediaToggle(mediaType)}}
            />  {MediaTypes[mediaType]}  
        </div>)
    })

    const options = [
        {value: "", label: "No Sort"},
        {value: "title", label: "Title"},
        {value: "recently_added", label: "Most Recently Added"},
        {value: "release_year", label: "Year Released"},
        {value: "recently_edited", label: "Most Recently Edited"},
    ]

    const filter_select = (<Select className="text-black" defaultValue={options[0].value} options={options} onChange={handleSortModeChange} />)

    const searchBar = (<input value={searchTerm} onChange={handleSearchChange}/>)

    return (<div className="flex flex-row">{media_types}<br/>{searchBar}<br/>{filter_select}</div>)
}

export default Toolbar