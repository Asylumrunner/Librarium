import { useFetchCollectionQuery } from "../store"
import GridCell from "./GridCell"

function GridView() {
    const { data, error, isFetching } = useFetchCollectionQuery([])
    
    if (isFetching) {
        return <div>Fetching collection</div>
    } else if (error) {
        return <div>Error attempting to fetch collection</div>
    } else {
        var gridCells = []
        Object.keys(data).forEach(genre => {
            data[genre].forEach( entry => {
                gridCells.push(<GridCell item={entry} mediatype={genre} />)
            })
        })
        return <div>
            {gridCells}
        </div>
    }
    
}

export default GridView