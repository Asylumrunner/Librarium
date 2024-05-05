import { useFetchCollectionQuery } from "../store"

function GridView() {
    const { data, error, isFetching } = useFetchCollectionQuery([])
    
    if (isFetching) {
        return <div>Fetching collection</div>
    } else if (error) {
        return <div>Error attempting to fetch collection</div>
    } else {
        return <div>
            {data}
        </div>
    }
    
}

export default GridView