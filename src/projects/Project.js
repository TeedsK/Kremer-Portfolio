import React from "react";
import "./Project.css"
// import { ParallaxLayer } from '@react-spring/parallax'
import { Parallax } from 'react-scroll-parallax';


/**
 * This react component represents a generic project class
 * it can take in title and subtitles along with images to present
 * 
 * @author - Theo Kremer
 * @version - 1.0.0
 */
export class Project extends React.Component {

    /**
     * the constructor
     * 
     * @param {*} props - the properties
     */
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
    }

    /**
     * Checks if an element is in the viewport
     * 
     * @param {*} className - the name of the class to check if it's in the viewport
     */
    checkIfInViewport = (className) => {

        const elements = document.getElementsByClassName(className);


        for (let i = 0; i < elements.length; i++) {
            const rect = elements[i].getBoundingClientRect();

            const windowHeight = (window.innerHeight || document.documentElement.clientHeight) - 80;
            const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

            const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
            const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

            if (vertInView && horInView) {
                elements[i].style.opacity = "1"
                elements[i].style.marginLeft = "0vw";
            } else {
                elements[i].style.opacity = "0"
                elements[i].style.marginLeft = "-2vw";
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
        this.checkIfInViewport("project-text");
    }

    createParallax = (src, speed, layer, width, xoffset, yoffset) => {
        return (<Parallax className={layer} style={{ position: 'absolute', top: yoffset, right: xoffset }}
            speed={speed}>
            <img className="para" style={{ width: width }} src={src}></img>
        </Parallax>
        )
    }

    /**
     * @returns element containing everything
     */
    render() {

        let sections = [];

        this.props.sections.forEach((element, index) => {

            let skills = []

            if(element.skills != null) {
                element.skills.forEach((element, index) => {
                    skills.push(
                        <div className="project-text project-skills" key={index}>
                            <a className="sfproB">{element}</a>
                        </div>
                    )
                })
            }
            

            sections.push(
                <div className="project-details" key={index}>
                    <a style={{backgroundImage: `linear-gradient(45deg, ${this.props.gradient[0]}, ${this.props.gradient[1]})`}} className="project-text sfproB project-mini-title">{element.title}</a>
                    <p className="project-text sfproB project-mini-subtitle">{element.subtitle}</p>
                    <pre className="project-text sfproB project-mini-description">{element.description}</pre>
                    {skills}
                </div>
            )
        }); 

        return (
            // <div className='project-container'>
            <div id="project-background" className="kudo-background">

                <div className="project-information">
                    <div className="inner-info">
                        <a style={{backgroundImage: `linear-gradient(45deg, ${this.props.gradient[0]}, ${this.props.gradient[1]})`}} className="project-text sfproSB project-title">{this.props.projectTitle}</a>
                        <p className="project-text sfproB project-subtitle"><span style={{marginLeft: "0.4vw"}}>{this.props.projectDescription}</span></p>
                        <div className="project-text project-subtitle-buttons">
                            <a className="sfproB">site</a>
                            <a className="sfproB">download</a>
                        </div>
                        <div className="project-sections">
                            {sections}
                        </div>
                    </div>

                </div>

                {/* Foreground */}
                {this.createParallax("/images/kudo/Blue.png", 50, "foreground", "40vw", "10vw", "90vh")}

                {/* Midground */}
                {this.createParallax("/images/kudo/Harvesters.png", 35, "midground", "27vw", "4vw", "83vh")}
                {this.createParallax("/images/kudo/TitleImage.png", 35, "midground", "24vw", "15vw", "140vh")}
                {this.createParallax("/images/kudo/whiteImage.png", 35, "midground", "24vw", "20vw", "116vh")}


                {/* Background */}
                {this.createParallax("/images/kudo/Blue2.png", 25, "background", "20vw", "30vw", "134vh")}
                {this.createParallax("/images/kudo/ProfilesPage.png", 25, "background", "21vw", "3vw", "123vh")}

            </div>

        )
    }
}