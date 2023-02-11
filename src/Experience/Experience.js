import React from "react";
import './Experience.css';
import { gsap } from "gsap";

function componanyLink(link) {
    console.log(link);
    window.open(link, '_blank');
}

let PATH;

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

/**
 * This function moves the cards up one by one
 * 
 * @param {*} positions - the current positions of the cards
 * @param {*} index - the index of the card which is currently being animated
 * @param {*} total - the total number of cards
 */
function moveUp(path, section, positions, index, total) {

    const slides = document.getElementsByClassName('exp' + section)

    for (let i = 0; i < total + 1; i++) {
        if (i != index) {
            const startingPosition = positions[i];
            const slide = slides[i];
            gsap.to(slide, {
                duration: 5,
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
                }
            })
        }
    }
}

/**
 * This function switches the card that is in the front to move it to the back
 * 
 * @param {*} positions - the current positions of the cards
 * @param {*} index - the index of the card which should be moved to the back
 * @param {*} total - the total number of cards
 */
function runSwitchAnimation(path, section, positions, index, total) {
    if (index < 0) {
        index = total
    }
    const slide = document.getElementsByClassName('exp' + section)[index];
    const gradient = document.getElementsByClassName('exp-grad' + section)[index];
    const time = 10;

    moveUp(path, section, positions, index, total);
    gsap.to(slide, {
        delay: (time / 3),
        css: {
            zIndex: -1
        }
    })
    gsap.to(slide, {
        duration: 1,
        scale: 0.25,
        borderRadius: "50%",
        outline: "0vw solid #393943",
        width: "25vw",
        height: "25vw",
        yoyo: true,
        repeatDelay: 5,
        repeat: 1,
        ease: "power1.inOut",
    })
    gsap.to(gradient, {
        duration: 1,
        borderRadius: "50%",
        opacity: 1,
        yoyo: true,
        repeatDelay: 5,
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
            runSwitchAnimation(path, section, positions, (index - 1), total);
        }
    })
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
            positions: this.props.positions
        }
    }

    /**
     * 
     */
    componentDidMount() {

        const section = this.props.section;
        const path = this.props.path;
        const delay = this.props.delay

        const elements = document.getElementsByClassName("exp" + section);


        const positions = this.state.positions;
        const total = this.props.workplaces.length - 1;
        for (let i = total; i >= 0; i--) {
            gsap.to(elements[i], {
                motionPath: {
                    path: path,
                    alignOrigin: [0.5, 0.5],
                    start: 0,
                    end: this.state.positions[i],
                },
                delay: delay,
                onComplete() {
                    if (i == (total)) {
                        runSwitchAnimation(path, section, positions, i, total);
                    }
                }
            })

            let hoverAnimation = gsap.to(elements[i], {
                paused: true,
                duration: 0.5,
                ease: "power1.inOut",
                css: {
                    top: "12%",
                },
            })

            elements[i].addEventListener("mouseenter", () => {
                console.log(positions[i])
                if (positions[i] <= 0.955)
                    hoverAnimation.play()
            });
            elements[i].addEventListener("mouseleave", () => hoverAnimation.reverse());

        }
    }

    /**
     * 
     * @returns 
     */
    render() {

        const cards = [];
        const workplaces = this.props.workplaces;
        const section = this.props.section;

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

        if(this.props.rightOriented) {

            left = 
            <div className="experience-text-wrapper">
                <div className="experience-inner-wrapper" style={{
                    marginLeft: "5vw"
                }}>
                    <a className="sfproSB fade">{this.props.title}</a>
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
                    <a className="sfproSB fade">{this.props.title}</a>
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