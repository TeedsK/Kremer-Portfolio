import React from "react";
import './Overview.css'


function Language(props) {
    return (
        <div className="fade language-wrapper sfpro">
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
        this.handleScroll = this.handleScroll.bind(this);
    }

    /**
     * Checks if an element is in the viewport
     * 
     * @param {*} className - the name of the class to check if it's in the viewport
     */
    checkIfInViewport = (className, startAmt, endAmt) => {

        const elements = document.getElementsByClassName(className);

        for (let i = 0; i < elements.length; i++) {
            const rect = elements[i].getBoundingClientRect();

            const windowHeight = (window.innerHeight || document.documentElement.clientHeight) - 80;
            const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

            const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
            const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

            if (vertInView && horInView) {
                elements[i].style.opacity = "1"
                elements[i].style.marginTop = `${endAmt}vw`;
            } else {
                elements[i].style.opacity = "0"
                elements[i].style.marginTop = `${startAmt}vw`;
            }
        }
    }

    /**
     * checks if this component has mounted
     */
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
    }

    /**
     * checks if the version will be unmomunted
     */
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    /**
     * handles if the viewport has been scrolled
     */
    handleScroll() {
        this.checkIfInViewport("overview-skills", "5", "-5");
    }

    render() {
        return (
            <div className="overview-wrapper">
                <div className="overview-skills">
                    <div className="overview-section">
                        <div className="ovw-left-wrapper">
                            <a className="sfproB fade ovw-name">Theo Kremer</a>
                            <p className="sfpro fade ovw-name-subtitle">overview summary</p>
                            <a className="sfproB fade ovw-title">Full-Stack Developer</a>
                            <p className="sfpro fade ovw-title-description">Through designing user-interfaces, databases, and server side creation I have expterise in developing applications at each layer of the technology stack, front-end and back-end.</p>
                        </div>
                        <div className="ovw-right-wrapper">
                            <div className="ovw-skills-wrapper">
                                <a className="sfproB fade ovw-pg-lang-title">Programming Languages</a>
                                <p className="sfpro fade ovw-pg-lang-subtitle">the various languages I have practice coding and confidence using</p>
                                {this.state.languages.map((item, i) => {
                                    return <Language key={i} lang={item}/>
                                })}
                            </div>
                            <div className="ovw-resources-wrapper">
                                <a className="sfproB fade ovw-pg-lang-title">Resources</a>
                                <p className="sfpro fade ovw-pg-lang-subtitle">the different tools I use for efficient and effective programming</p>
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