import React from "react";
import './Experience.css';
import { gsap } from "gsap";

function componanyLink(link) {
    console.log(link);
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

function moveUp(positions, index, total) {

    const slides = document.getElementsByClassName('experience')
    console.log(positions);
    for (let i = 0; i < total + 1; i++) {
        if (i != index) {
            const slide = slides[i];
            gsap.to(slide, {
                duration: 5,
                ease: "power1.inOut",
                motionPath: {
                    path: "M68.44901,38.39 C68.77201,91.22 58.48401,243.335 137.65501,252.625 212.07501,261.357 485.20501,235.173 486.83301,135.9 488.59701,28.284 430.77101,-10.087 296.79801,-4.688 75.78201,4.218 68.65001,25.48 68.80101,38.782 ",
                    alignOrigin: [0.5, 0.5],
                    start: positions[i],
                    end: positions[i] + 0.05
                },
                onComplete() {
                    positions[i] = positions[i] + 0.05;
                    slide.style.zIndex = positions[i] / 0.05;
                }
            })
        }
    }
}

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
        width: "40%",
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
        // immediateRender: true,
        motionPath: {
            path: "M68.44901,38.39 C68.77201,91.22 58.48401,243.335 137.65501,252.625 212.07501,261.357 485.20501,235.173 486.83301,135.9 488.59701,28.284 430.77101,-10.087 296.79801,-4.688 75.78201,4.218 68.65001,25.48 68.80101,38.782 ",
            // align: "M68.44901,38.39 C68.77201,91.22 58.48401,243.335 137.65501,252.625 212.07501,261.357 485.20501,235.173 486.83301,135.9 488.59701,28.284 430.77101,-10.087 296.79801,-4.688 75.78201,4.218 68.65001,25.48 68.80101,38.782 ",
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
                    path: "M68.44901,38.39 C68.77201,91.22 58.48401,243.335 137.65501,252.625 212.07501,261.357 485.20501,235.173 486.83301,135.9 488.59701,28.284 430.77101,-10.087 296.79801,-4.688 75.78201,4.218 68.65001,25.48 68.80101,38.782  ",
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
                css: {
                    top: "13%",
                },
            })
        
            elements[i].addEventListener("mouseenter", () => {
                if(positions[i] <= 0.96)
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