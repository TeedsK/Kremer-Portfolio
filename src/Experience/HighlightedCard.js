import React from "react";
import './HighlightedCard.css'

export class HighlightedCard extends React.Component {

    constructor(props) {
        super(props)
    }

    imgClick = (link) => {
        window.open(link, '_blank');
    }

    render() {
        return (
            <div className={"htld-card-body-"+this.props.section} style={{
                zIndex: "1000",
                pointerEvents: 'none',
                width: "60vw",
                height: "65vh",
                position: "absolute",
                top: "15vh",
                right: "10vw",
                opacity: 0,
            }}>
                <div className="hltd-exp-header">
                    <div className="htld-exp-header-wrapper">
                        <a className="sfproSB hltd-exp-cmp-name">{this.props.CompanyName}</a>
                        <br />
                        <a className="sfpro hltd-exp-cmp-role">Worked as a: <br /><span className="sfproB cmp-role-title">{this.props.Role}</span></a>
                    </div>
                    <a className="sfpro hltd-exp-cmp-years">{this.props.YearsWorked}</a>
                </div>
                <div className="hltd-exp-txt-body">
                    <div className="hltd-exp-first-row">
                        <div className="sfpro hltd-exp-left-dsc">
                            <p>{this.props.WorkDescriptionOne}</p>
                        </div>
                        <div className="sfpro hltd-exp-right-dsc">
                            <a className="sfproSB hltd-exp-abt-title">About {this.props.CompanyName}</a>
                            <p>{this.props.CompanyDescription}</p>
                            <a onClick={this.imgClick.bind(this, this.props.CompanyLink)} style={{
                                textDecoration: "underline",
                                color: "#0000EE",
                                cursor: "pointer"
                            }}>{this.props.CompanyLink}</a>
                        </div>
                    </div>
                    <div className="sfpro hltd-exp-second-row">
                        <p>{this.props.WorkDescriptionTwo}</p>
                    </div>
                    <div className="sfpro hltd-exp-third-row">
                        <p>{this.props.WorkDescriptionThree}</p>
                    </div>
                </div>
            </div>
        )
    }
}