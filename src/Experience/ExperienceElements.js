import React from "react";
import { Experience } from './Experience'
import { gsap } from "gsap";
import "./ExperienceElement.css"

export class ExperienceElements extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            translations: [],
        }
    }

    rotate = () => {
        const slides = document.getElementsByClassName("element-slide");
        const index = this.state.index;
        const translations = this.state.translations;

        if(index >= (slides.length - 1)) {
            gsap.to(slides[index - 1], {
                duration: 0,
                transform: `translateX(${(100 * ((slides.length - 1)))}%)`,
                ease: "power2.inOut"
            })
            translations[index - 1] = 100 * ((slides.length - 1));
        } else if(index == 0) {
            gsap.to(slides[1], {
                duration: 0,
                transform: `translateX(0%)`,
                ease: "power2.inOut"
            })
            translations[1] = 0;
        }

        for(let i = index; i < slides.length; i++) {
            const current = translations[i];
            gsap.to(slides[i], {
                duration: 1,
                transform: `translateX(-${current + 100}%)`,
                ease: "power2.inOut"
            })
            translations[i] = (current + 100);
        }

        if(index == slides.length - 1) {
            gsap.to(slides[0], {
                duration: 1,
                transform: `translateX(-${0}%)`,
                ease: "power2.inOut"
            })
            translations[0] = (0);
        }
        
        this.setState({
            index: index >= (slides.length - 1) ? 0 : index + 1
        })
    }

    render() {

        const elements = [];

        this.props.categories.forEach((experience, i) => {
            elements.push(
                <div key={i} className="element-slide">
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
            this.state.translations.push(0);
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