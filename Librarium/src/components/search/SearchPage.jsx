import { useState } from "react"
import SearchBox from "./SearchBox"
import SearchResults from "./SearchResults"

function SearchPage() {
    const [searchObject, setSearchObject] = useState({})

    const submitSearchFunction = (searchTerm, mediaType) => {
        setSearchObject({
            'title': searchTerm,
            'media_type': mediaType
        })
    }
    return (<div>
        <SearchBox searchFunction={submitSearchFunction} />
        {searchObject != {} && <SearchResults searchObject={searchObject} />}
    </div>)
}

export default SearchPage