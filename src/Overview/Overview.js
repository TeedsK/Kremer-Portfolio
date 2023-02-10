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
                    <div className="overview-section overview-left">
                        <OverviewSection
                            title="Debugger"
                            subtitle="Efficiently identifying and fixing errors within software"
                            description=""
                        />
                    </div>
                    <div className="overview-section overview-middle">
                        <OverviewSection
                            title="Full-Stack Developer"
                            subtitle="Writing front and back end code"
                            coloredTitle="Languages I Know"
                            itemBlocks={[
                                "Java",
                                "Python",
                                "C#",
                                "PHP",
                                "HTML",
                                "CSS",
                                "JavaScript",
                                "React"
                            ]}
                        />
                    </div>
                    <div className="overview-section overview-right">
                        <OverviewSection
                            title="Designer"
                            subtitle="Creating elegant appearances for users"
                            description=""
                        />
                    </div>
                </div>
                <div className="overview-other-details">
                    {/* <div className="sfproSB known-programming-languages">
                        <a>Programming Languages I Know</a>
                        <div className="known-languages-wrapper">
                            <Language lang="Java"/>
                            <Language lang="Python"/>
                            <Language lang="C#"/>
                            <Language lang="PHP"/>
                            <Language lang="HTML"/>
                            <Language lang="CSS"/>
                            <Language lang="JavaScript"/>
                            <Language lang="React"/>
                        </div>
                    </div>
                    <br/>
                    <div className="sfproSB known-tools">
                        <a>Resources I Use</a>
                        <div className="known-tools-wrapper">
                            <Language lang="Git"/>
                            <Language lang="Adobe Photoshop"/>
                            <Language lang="Adobe Illustrator"/>
                            <Language lang="Git"/>
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }
}