import { useFetchCollectionQuery } from "../store"
import { useSelector } from "react-redux"
import GridCell from "./GridCell"

function GridView() {
    const { selectedMediaTypes } = useSelector((state) => {
        return state.dataFilter
    })
    
    const excludedMediaTypes = Object.entries(selectedMediaTypes).filter(([k, v]) => !v).map(([k, v]) => k)

    const { data, error, isFetching } = useFetchCollectionQuery([])
    
    if (isFetching) {
        return <div>Fetching collection</div>
    } else if (error) {
        return <div>Error attempting to fetch collection</div>
    } else {
        var filteredData = Object.entries(data).filter(([k, v]) => !excludedMediaTypes.includes(k))
        var gridCells = []
        filteredData.forEach(([media_type, entries]) => {
            entries.forEach( entry => {
                gridCells.push(<GridCell item={entry} mediatype={media_type} />)
            })
        })
        return <div className="grid grid-cols-5 gap-6">
            {gridCells}
        </div>
    }
    
}

export default GridView