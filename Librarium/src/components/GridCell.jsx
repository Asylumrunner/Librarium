function GridCell({item, mediatype}) {
    return (<div>
        {item.name}
        <br/>
        {mediatype}
    </div>)
}

export default GridCell