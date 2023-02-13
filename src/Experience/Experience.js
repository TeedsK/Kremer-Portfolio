import React from "react";
import './Experience.css';
import { gsap } from "gsap";

function componanyLink(link) {
    window.open(link, '_blank');
}

/**
 * Creates a new experience card
 * 
 * @param {*} props - the properties of the card
 * @returns a new experience card 
 */
function ExperienceCard(props) {

    const element =
        <div className={`fade exp${props.section} experience`} style={{
            right: (props.rightOriented ? "100" : "0")
        }}>
            <div className={`exp-grad${props.section} experience-gradient exp-grad-${props.index}`} />
            <div className="experience-header">
                <a className="sfproB experience-company-name">{props.companyName}</a>
                <a className="sfproB experience-company-role">{props.myRole}</a>
                <a className="sfpro experience-company-years">{props.yearsWorked}</a>
            </div>
            <div className="sfproB experience-description">
                <p>{props.myContributions}</p>
            </div>
            <div className="experience-footer">
                <a onClick={() => componanyLink(props.companyWebsite)}>view company website</a>
            </div>
        </div>


    return element;
}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * 
 */
export class Experience extends React.Component {

    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props)

        this.state = {
            positions: this.props.positions,
            path: this.props.path,
            section: this.props.section,
            delay: this.props.delay,
            total : this.props.workplaces.length,
            highlighted: -1,
        }
    }

    rushCardToFront = (index) => {

        this.setState({
            highlighted: index
        })

        const elements = document.getElementsByClassName("exp" + this.state.section);
        const positions = this.state.positions;

        console.log(elements);

        gsap.to(elements[index], {
            duration: 0.5,
            ease: "power1.inOut",
            css: {
                top: "10%",
            },
        })
    
        for(let i = 0; i < positions.length; i++) {
            if(positions[i] != positions[index] && positions[i] >= 0.95) {
                this.runSwitchAnimation(i, 2, true)
            }
        }
    }

    runSwitchAnimation = (index, customDuration) => {
        if (index < 0) {
            index = this.state.total - 1
        }

        const path = this.state.path;
        const section = this.state.section;
        const positions = this.state.positions;
        const total = this.state.total - 1;

        const slide = document.getElementsByClassName('exp' + section)[index];
        const gradient = document.getElementsByClassName('exp-grad' + section)[index];
        const time = customDuration ? customDuration : 5;
        const nextAnimation = () => {this.runSwitchAnimation((index - 1))};

        positions[index] = 0;
    
        this.moveUp(index, customDuration);
    
        gsap.to(slide, {
            delay: (time / 3),
            css: {
                zIndex: -1
            }
        })
        gsap.to(slide, {
            duration: 0.65,
            scale: 0.25,
            borderRadius: "50%",
            outline: "0vw solid #393943",
            width: "25vw",
            height: "25vw",
            yoyo: true,
            repeatDelay: (time / 2),
            repeat: 1,
            ease: "power1.inOut",
        })
        gsap.to(gradient, {
            duration: 0.65,
            borderRadius: "50%",
            opacity: 1,
            yoyo: true,
            repeatDelay: (time / 2),
            repeat: 1,
            ease: "power1.inOut",
        })
        gsap.to(slide, {
            duration: time,
            ease: "power1.inOut",
            motionPath: {
                path: path,
    
                alignOrigin: [0.5, 0.5],
                start: 0,
                end: 1.0 - (0.05 * (total))
            },
            onComplete() {
                slide.style.zIndex = 0;
                positions[index] = 1.0 - (0.05 * (total));
                nextAnimation();
            }
        })
    }

    moveUp = (index, durationCustom, _callback) => {

        const positions = this.state.positions;
        const path = this.state.path;
        const section = this.state.section;
        const total = this.state.total;

        const slides = document.getElementsByClassName('exp' + section)
        const duration = durationCustom ? (durationCustom / 2) : 2.5;
    
        for (let i = 0; i < total + 1; i++) {
            if (i != index) {
                const startingPosition = positions[i];
                const slide = slides[i];
                if(slide != undefined) {
                    gsap.to(slide, {
                        duration: duration,
                        ease: "power1.inOut",
                        motionPath: {
                            path: path,
                            alignOrigin: [0.5, 0.5],
                            start: positions[i],
                            end: positions[i] + 0.05
                        },
                        onUpdate() {
                            positions[i] = startingPosition + (0.05 * this.ratio);
                        },
                        onComplete() {
                            // positions[i] = positions[i] + 0.05;
                            slide.style.zIndex = positions[i] / 0.05;
                            if(_callback && positions[i] >= 1)
                                _callback()
                        }
                    })
                }
                
            }
        }
    }


    /**
     * 
     */
    componentDidMount() {

        const positions = this.state.positions;
        const section = this.state.section;
        const path = this.state.path;
        const delay = this.state.delay;

        const elements = document.getElementsByClassName("exp" + section);
        const total = this.props.workplaces.length;

        for (let i = total - 1; i >= 0; i--) {

            const startAnimation = () => {this.runSwitchAnimation(i)};

            gsap.to(elements[i], {
                motionPath: {
                    path: path,
                    alignOrigin: [0.5, 0.5],
                    start: 0,
                    end: this.state.positions[i],
                },
                delay: delay,
                onComplete() {
                    if (i == (total - 1)) {
                        startAnimation();
                    }
                }
            })

            let hoverAnimation = gsap.to(elements[i], {
                paused: true,
                duration: 0.5,
                ease: "power1.inOut",
                css: {
                    top: "16%",
                },
            })

            const clickAnimation = () => {
                this.rushCardToFront(elements, path, section, positions, i);
            }

            elements[i].addEventListener("mouseenter", () => {
                if (positions[i] <= 0.955)
                    hoverAnimation.play()
            });
            elements[i].addEventListener("mouseleave", () => hoverAnimation.reverse());

            elements[i].addEventListener("click", () => clickAnimation())
        }
    }

    /**
     * 
     * @returns 
     */
    render() {

        const cards = [];
        const workplaces = this.props.workplaces;
        const section = this.state.section;

        workplaces.forEach((item, index) => {
            cards.push(
                <ExperienceCard
                    rightOriented={this.props.rightOriented}
                    section={section}
                    companyName={item.companyName}
                    companyDescription={item.companyDescription}
                    companyWebsite={item.companyWebsite}
                    yearsWorked={item.yearsWorked}
                    myContributions={item.myContributions}
                    myRole={item.myRole}
                    key={index}
                    index={index}
                ></ExperienceCard>
            )
        })

        let left;
        let right;

        let colors = ""
        this.props.gradient.forEach((color) => {
            colors = colors + ", " + color
        })

        console.log(colors);

        if(this.props.rightOriented) {

            left = 
            <div className="experience-text-wrapper">
                <div className="experience-inner-wrapper" style={{
                    marginLeft: "5vw"
                }}>
                    <a style={{backgroundImage: `linear-gradient(45deg ${colors})`}} className="sfproSB fade">{this.props.title}</a>
                    {this.props.description}
                </div>
            </div>
    
            right = 
            <div className="experience-slide-wrapper">
                {cards}
            </div>
        } else {

            right = 
            <div className="experience-text-wrapper">
                <div className="experience-inner-wrapper" style={{
                    marginRight: "5vw",
                    textAlign: "right"
                }}>
                    <a style={{backgroundImage: `linear-gradient(45deg ${colors})`}} className="sfproSB fade">{this.props.title}</a>
                    {this.props.description}
                </div>
            </div>
    
            left = 
            <div className="experience-slide-wrapper">
                {cards}
            </div>
        }

        return (
            <div className="experience-wrapper">
                {left}
                {right}
            </div>
        )
    }
}