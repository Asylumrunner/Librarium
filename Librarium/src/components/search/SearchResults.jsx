import { useSearchForItemQuery } from "../../store"
import GridCell from "../GridCell"

function SearchResults({searchObject}) {
    console.log(searchObject)
    const { data, error, isFetching } = useSearchForItemQuery(searchObject)

    if (isFetching) {
        return (<div>Fetching response</div>)
    } else if (error) {
        console.log(error)
        return (<div>Shit's fucked!</div>)
    } else {
        console.log(data)
        var gridCells = []
        data.data.forEach( entry =>
            gridCells.push(<GridCell key={entry.guid} item={entry} mediatype={entry.media_type} />)
        )
        return <div className="grid grid-cols-5 gap-6">
            {gridCells}
        </div>
    }
}

export default SearchResults