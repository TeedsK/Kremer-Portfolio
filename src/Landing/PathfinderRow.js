import React from "react";

export class RowPane extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let items = []

        this.props.childs.forEach((node, i) => {
            items.push(node.render(i))
        })

        return (
            <div style={{height: `${this.props.height}vw`}} className="nodeRow">
                {items}
            </div>
        );
    }
}