import React from "react";
import './Experience.css';
import { gsap } from "gsap";

function componanyLink(link) {
    console.log(link);
    window.open(link, '_blank');
}

const PATH = "M66.11101,92.425 C64.52401,152.421 69.41501,263.969 148.57201,273.289 222.97701,282.015 456.15401,266.255 504.19601,104 536.46901,-5 430.00901,-19.944 296.79801,-4.688 137.93201,13.505 81.58701,80.47 66.83801,92.604 ";
const MIRROR_PATH = "M -66.111 92.425 C -64.524 152.421 -69.415 263.969 -148.572 273.289 C -222.977 282.015 -456.154 266.255 -504.196 104 C -536.469 -5 -430.009 -19.944 -296.798 -4.688 C -137.932 13.505 -81.587 80.47 -66.838 92.604"


/**
 * Creates a new experience card
 * 
 * @param {*} props - the properties of the card
 * @returns a new experience card 
 */
function ExperienceCard(props) {

    const element =
        <div className="fade experience">
            <div className={`experience-gradient exp-grad-${props.index}`} />
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
function moveUp(positions, index, total) {

    const slides = document.getElementsByClassName('experience')
   
    for (let i = 0; i < total + 1; i++) {
        if (i != index) {
            const startingPosition = positions[i];
            const slide = slides[i];
            gsap.to(slide, {
                duration: 5,
                ease: "power1.inOut",
                motionPath: {
                    path: PATH,
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
function runSwitchAnimation(positions, index, total) {
    if (index < 0) {
        index = total
    }
    const slide = document.getElementsByClassName('experience')[index];
    const gradient = document.getElementsByClassName('experience-gradient')[index];
    const time = 10;

    moveUp(positions, index, total);
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
            path: PATH,
                    
            alignOrigin: [0.5, 0.5],
            start: 0,
            end: 1.0 - (0.05 * (total))
        },
        onComplete() {
            slide.style.zIndex = 0;
            positions[index] = 1.0 - (0.05 * (total));
            runSwitchAnimation(positions, (index - 1), total);
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
            positions: [0.9, 0.95, 1.0]
        }
    }

    /**
     * 
     */
    componentDidMount() {

        const elements = document.getElementsByClassName("experience");
        
        
        const positions = this.state.positions;
        const total = this.props.workplaces.length - 1;
        for (let i = total; i >= 0; i--) {
            gsap.to(elements[i], {
                motionPath: {
                    path: PATH,
                    alignOrigin: [0.5, 0.5],
                    start: 0,
                    end: this.state.positions[i],
                },
                onComplete() {
                    if (i == (total)) {
                        runSwitchAnimation(positions, i, total);
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
                if(positions[i] <= 0.955)
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

        workplaces.forEach((item, index) => {
            cards.push(
                <ExperienceCard
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

        

        return (
            <div className="experience-wrapper">
                <div className="experience-text-wrapper">
                    <div className="experience-inner-wrapper">
                        <a className="sfproSB fade">Experience</a>
                        <p className="sfproB fade">View the previous companies I've worked at, having grown my skills and teamwork abilities<br /><br />Expand a card by clicking its header</p>
                    </div>

                </div>
                <div className="experience-slide-wrapper">
                    {cards}
                </div>
            </div>
        )
    }
}