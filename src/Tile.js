export default function Tile(props) {
    let newStyle = props.selected ? { "backgroundColor": "rgb(169, 219, 150)" } : {backgroundColor: "rgb(253, 253, 253)"};
    return (
        <div
            className="Tile bradius9"
            onClick={props.click}
            id={props.newKey}
            style={newStyle}
        >
            <h1 id={props.newKey}>{props.number}</h1>
        </div>
    )
}