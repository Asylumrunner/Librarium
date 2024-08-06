import { useFetchCollectionQuery } from "../store"
import { useSelector } from "react-redux"
import GridCell from "./GridCell"
import MediaTypes from "../models/mediaTypes";

function GridView() {
    const { selectedMediaTypes, searchTerm, sortMode } = useSelector((state) => {
        return state.dataFilter
    })

    const sortOptions = {
        "title": (x, y) => x.title.localeCompare(y.title),
        "recently_added": (x, y) => {
            let xDate = Date.parse(x.date_inserted)
            let yDate = Date.parse(y.date_inserted)
            if (xDate < yDate) {
                return -1
            } else if (xDate > yDate) {
                return 1
            } else {
                return 0
            }
        },
        "release_year": (x, y) => x.release_year.localeCompare(y.release_year),
        "recently_edited": (x, y) => {
            let xDate = Date.parse(x.date_last_updated)
            let yDate = Date.parse(y.date_last_updated)
            if (xDate < yDate) {
                return -1
            } else if (xDate > yDate) {
                return 1
            } else {
                return 0
            }
        }
    }
    
    const excludedMediaTypes = Object.entries(selectedMediaTypes).filter(([k, v]) => !v).map(([k, v]) => k)

    const { data, error, isFetching } = useFetchCollectionQuery(Object.keys(MediaTypes))
    
    if (isFetching) {
        return <div>Fetching collection</div>
    } else if (error) {
        return <div>Error attempting to fetch collection</div>
    } else {
        var filteredData = data.data.filter(item => !excludedMediaTypes.includes(item.media_type) && item.title.includes(searchTerm))
        if (sortMode in sortOptions) {
            filteredData.sort(sortOptions[sortMode])
        }
        var gridCells = []
        filteredData.forEach( entry =>
            gridCells.push(<GridCell item={entry} mediatype={entry.media_type} inCollection={true} />)
        )
        return <div className="grid grid-cols-7 gap-3">
            {gridCells}
        </div>
    }
    
}

export default GridView