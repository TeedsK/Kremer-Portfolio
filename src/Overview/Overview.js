import React from "react";
import './Overview.css'

function OverviewSection(props) {

    // const items = []

    // props.itemBlocks.forEach((value, i) => {
    //     items.push(
    //         <Language key={i} lang={value}/>
    //     )
    // })

    return (
        <div className="overview-item">
            <a className="sfproSB overview-item-title">{props.title}</a>
            <p className="sfproB overview-item-subtitle">{props.subtitle}</p>
            <div>
                {/* {items} */}
            </div>
        </div>
    )
}

function Language(props) {
    return (
        <div className="language-wrapper sfpro">
            <a>{props.lang}</a>
        </div>
    )
}

export class Overview extends React.Component {
    render() {
        return (
            <div className="overview-wrapper">
                <div className="overview-skills">
                    <div className="overview-section">
                        <div className="ovw-left-wrapper">
                            <a>Theo Kremer</a>
                            <p>overview summary</p>
                            <a>Full-Stack Developer</a>
                            <p>stuff about being develop</p>
                        </div>
                        <div className="ovw-right-wrapper">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}