function GridCell({item, mediatype}) {
    return (<div>
        <img src="https://picsum.photos/150" /> <br/>
        <div>
            {item.name}
        </div>
        <div>
            {mediatype}
        </div>
    </div>)
}

export default GridCell