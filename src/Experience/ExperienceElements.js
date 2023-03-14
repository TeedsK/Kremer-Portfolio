import React from "react";
import { Experience } from './Experience'
import { gsap } from "gsap";
import "./ExperienceElement.css"

/**
 * This class represents the container for the experience elements
 * 
 * @author Theo Kremer
 */
export class ExperienceElements extends React.Component {

    /**
     * the constructor for the experience elements object
     * it initiates the state variables
     * @param {*} props - the given properties
     */
    constructor(props) {
        super(props);

        const translations = [];

        for(let i = 0; i < this.props.categories.length; i++) {
            translations.push(100 * i);
        }

        this.state = {
            index: 0,
            translations: translations,
        }
    }

    /**
     * Rotates the experience card slides one to the right
     */
    rotate = () => {
        const slides = document.getElementsByClassName("element-slide");
        const translations = this.state.translations;

        for(let i = 0; i < slides.length; i++) {
            
            const current = translations[i];

            if(current < 0) {
                gsap.to(slides[i], {
                    duration: 0,
                    transform: `translateX(${100 * (slides.length - 2)}vw)`,
                    ease: "power2.inOut"
                })
                translations[i] = (100 * (slides.length - 2))
            } else {

                gsap.to(slides[i], {
                    duration: 1,
                    transform: `translateX(${current - 100}vw)`,
                    ease: "power2.inOut"
                })
                translations[i] =(current - 100)
            }
        }
    }

    

    /**
     * Renders the experience elements section
     * @returns a container with all the experience cards
     */
    render() {

        const elements = [];

        this.props.categories.forEach((experience, i) => {

            elements.push(
                <div key={i} className="element-slide" style={{transform: `translateX(${this.state.translations[i]}vw)`}}>
                    <Experience
                        callback={this.rotate}
                        section={experience.section}
                        positions={experience.positions}
                        gradient={experience.gradient}
                        title={experience.title}
                        subtitle={experience.subtitle}
                        description={experience.description}
                        path={experience.path}
                        workplaces={experience.workplaces}
                    />
                </div>)
        })

        return (
            <div className="slides-wrapper">
                <div className="elements-slide-container">
                    {elements}
                </div>
                <div className="element-slide-switcher-button">
                    <div className="experience-arrow-wrapper">
                        <svg onClick={() => this.rotate()} className="exp-ar-ani" id="egIWRvPa5dV1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
                            <g className="exp-ar-ani" id="egIWRvPa5dV2_to" transform="translate(82.819275,150)">
                                <g className="exp-ar-ani" id="egIWRvPa5dV2_ts" transform="scale(0.895743,0.895743)">
                                    <path className="exp-ar-ani" id="egIWRvPa5dV2" d="M0,0L150,150L0,300" transform="translate(-75,-150)" fill="none" stroke="#242428" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="7" />
                                </g>
                            </g>
                            <path className="exp-ar-ani" id="egIWRvPa5dV3" d="M323.316233,150h-303.41647" transform="matrix(-.665118 0 0-1.000008 262.589828 300.0012)" fill="none" stroke="#242428" strokeWidth="6" strokeLinecap="round" strokeDashoffset="303.42" strokeDasharray="303.42" />
                        </svg>

                    </div>
                    
                </div>
            </div>
        )
    }
}