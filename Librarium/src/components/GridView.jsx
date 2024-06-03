import { useFetchCollectionQuery } from "../store"
import { useSelector } from "react-redux"
import GridCell from "./GridCell"
import MediaTypes from "../models/mediaTypes";

function GridView() {
    const { selectedMediaTypes } = useSelector((state) => {
        return state.dataFilter
    })
    
    const excludedMediaTypes = Object.entries(selectedMediaTypes).filter(([k, v]) => !v).map(([k, v]) => k)

    const { data, error, isFetching } = useFetchCollectionQuery(Object.keys(MediaTypes))
    
    if (isFetching) {
        return <div>Fetching collection</div>
    } else if (error) {
        return <div>Error attempting to fetch collection</div>
    } else {
        var filteredData = data.data.filter(item => !excludedMediaTypes.includes(item.media_type))
        var gridCells = []
        filteredData.forEach( entry =>
            gridCells.push(<GridCell item={entry} mediatype={entry.media_type} inCollection={true} />)
        )
        return <div className="grid grid-cols-5 gap-6">
            {gridCells}
        </div>
    }
    
}

export default GridView