import React from "react";
import './Overview.css'


function Language(props) {
    return (
        <div className="language-wrapper sfpro">
            <a>{props.lang}</a>
        </div>
    )
}

export class Overview extends React.Component {

    constructor(props) {
        super(props);

        const languages = ["Java", "C#", "Python", "HTML, CSS, and JS", "React", "SQL", "PHP"]
        const resources = ["Git", "Selenium", "Photoshop", "Illustrator"];

        this.state = {
            languages: languages, 
            resources: resources
        }
    }

    render() {
        return (
            <div className="overview-wrapper">
                <div className="overview-skills">
                    <div className="overview-section">
                        <div className="ovw-left-wrapper">
                            <a className="sfproB ovw-name">Theo Kremer</a>
                            <p className="sfpro ovw-name-subtitle">overview summary</p>
                            <a className="sfproB ovw-title">Full-Stack Developer</a>
                            <p className="sfpro ovw-title-description">Through designing user-interfaces, databases, and server side creation I have expterise in developing applications at each layer of the technology stack, front-end and back-end.</p>
                        </div>
                        <div className="ovw-right-wrapper">
                            <div className="ovw-skills-wrapper">
                                <a className="sfproB ovw-pg-lang-title">Programming Languages</a>
                                <p className="sfpro ovw-pg-lang-subtitle">the various languages I have practice coding and confidence using</p>
                                {this.state.languages.map((item, i) => {
                                    return <Language key={i} lang={item}/>
                                })}
                            </div>
                            <div className="ovw-resources-wrapper">
                                <a className="sfproB ovw-pg-lang-title">Resources</a>
                                <p className="sfpro ovw-pg-lang-subtitle">the different tools I use for efficient and effective programming</p>
                                {this.state.resources.map((item, i) => {
                                    return <Language key={i} lang={item}/>
                                })}
                            </div>
                        </div>
                        <object className="ovw-laptop-program" type="image/svg+xml" data="/images/Laptop.svg"></object>
                    </div>
                </div>
            </div>
        )
    }
}