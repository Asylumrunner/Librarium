import { useState } from "react"
import Select from "react-select";
import MediaTypes from "../../models/mediaTypes";

function SearchBox({searchFunction}) {
    const [userInput, setUserInput] = useState("")
    const [mediaType, setMediaType] = useState("")

    const handleChange = (event) => {
        setUserInput(event.target.value)
    }

    const handleMediaTypeChange = (option) => {
        setMediaType(option.value)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        searchFunction(userInput, mediaType)
    }

    let options = []
    Object.keys(MediaTypes).forEach((media_type) => {
        options.push({value: media_type, label: MediaTypes[media_type]})
    })

    return (<div>
        <form id="searchbox" onSubmit={handleFormSubmit}>
            <input value={userInput} onChange={handleChange}/>
            <Select className="text-black" defaultValue={options[0].value} options={options} onChange={handleMediaTypeChange} />
        </form>
        <button form="searchbox" type="submit">Search!</button>
    </div>)
}

export default SearchBox