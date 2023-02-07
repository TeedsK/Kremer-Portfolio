import React from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Xarrow, { Xwrapper } from "react-xarrows";

import './AboutMe.css'


export class AboutMe extends React.Component {
    constructor(props) {
        super(props);

        // const duration = 30;

        this.state = {
            lines: [],
            ids: ['traveler-sphere', 'ms-sphere', 'stop-motion-sphere', 'resale-sphere', 'video-editing-sphere'],
            textIds: ['traveler', 'machine-learning', 'stop-motion', 'resale', 'video-editing'],
            gsapMotion: [],
            selectedSphere: null,
        }
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
            } else {
                elements[i].style.opacity = "0"
            }
        }
    }

    clickHandler = (elementId) => {

        const selected = this.state.selectedSphere;
        const location = this.state.ids.indexOf(elementId);
        const ballShadows = document.getElementsByClassName('ball-shadow');

        if (selected != null && selected == elementId) {
            document.getElementById(this.state.textIds[location]).style.opacity = "0";
            
            gsap.to(".about-and-spheres", {
                css: {
                    left: '50%',
                    transform: 'translateX(-50%)',
                },
                ease: "power3.out",
            })

            gsap.to("#about-title", {
                css: {
                    textAlign: "center"
                },
                ease: "power3.out",
            })
            gsap.to("#about-description", {
                css: {
                    textAlign: "center"
                },
                ease: "power3.out",
            })
            gsap.to(".about-niche-info", {
                css: {
                    opacity: "1"
                },
                ease: "power3.out"
            })

            this.state.gsapMotion.forEach((ele) => {
                ele.play();
            })
            this.state.ids.forEach((ele) => {
                const temp = "#" + ele
                gsap.to(temp, {
                    duration: 1,
                    scale: 1,
                })
                gsap.to(".ball-shadow", {
                    duration: 1,
                    scale: 1,
                })
            })
            this.setState({
                selectedSphere: null
            })
        } else {
            this.setState({
                selectedSphere: elementId
            })
            this.state.gsapMotion.forEach((ele) => {
                ele.pause();
            })
            this.state.ids.forEach((ele, i) => {
                const temp = "#" + ele
                if (elementId != ele) {
                    document.getElementById(this.state.textIds[i]).style.opacity = "0";
                    gsap.to(temp, {
                        duration: 1,
                        scale: 0.5,
                    })
                    gsap.to(ballShadows[i], {
                        duration: 1,
                        scale: 0.8,
                    })
                } else {

                    document.getElementById(this.state.textIds[location]).style.opacity = "1";
                    gsap.to(temp, {
                        duration: 1,
                        scale: 1,
                    })
                    gsap.to(ballShadows[i], {
                        duration: 1,
                        scale: 1,
                    })

                    gsap.to(".about-and-spheres", {
                        css: {
                            left: '6vw',
                            transform: 'none',
                            
                        },
                        ease: "power3.out",
                    })

                    gsap.to("#about-title", {
                        css: {
                            textAlign: "left"
                        },
                        ease: "power3.out",
                    })
                    gsap.to("#about-description", {
                        css: {
                            textAlign: "left"
                        },
                        ease: "power3.out",
                    })
                    gsap.to(".about-niche-info", {
                        css: {
                            opacity: "0"
                        },
                        ease: "power3.out"
                    })
                }
            })
        }

    }

    componentDidMount() {

        const duration = 15;
        const amt = 5;

        gsap.registerPlugin(MotionPathPlugin);

        this.state.gsapMotion.push(
            gsap.to(".ball-shadow", {
                duration: duration,
                motionPath: {
                    path: "#path",
                    align: "#path",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: false
                },
                yoyo: false,
                repeat: -1,
                ease: "none",
                repeatDelay: 0,
                stagger: {
                    each: (duration / amt),
                    repeat: -1 // Repeats immediately, not waiting for the other staggered animations to finish
                }
            }))
        gsap.to(".ball-shadow", {
            duration: 1,
            css: {
                boxShadow: "0 22vw 3vh black",
            },
            repeat: -1,
            yoyo: true,
            yoyoEase: true,
            ease: "power2.out",
            repeatDelay: 0,
            stagger: {
                each: (duration / amt),
                repeat: -1
            }
        })

        this.state.gsapMotion.push(
            gsap.to('.sphere', {
                duration: duration,
                css: {
                    zIndex: 0,
                },
                repeat: -1,
                stagger: {
                    each: (duration / amt),
                    repeat: -1
                },
            })
        )
        gsap.to(".sphere", {
            duration: 1,
            css: {
                marginTop: '2.3vh'
            },
            repeat: -1,
            yoyo: true,
            yoyoEase: true,
            ease: "power2.out",
            stagger: {
                each: (duration / amt),
                repeat: -1
            }
        })

        this.state.gsapMotion.push(
            gsap.to(".sphere", {
                duration: duration,
                motionPath: {
                    path: "#path",
                    align: "#path",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true
                },
                yoyo: false,
                repeat: -1,
                ease: "none",
                repeatDelay: 0,
                stagger: {
                    each: (duration / amt),
                    repeat: -1 // Repeats immediately, not waiting for the other staggered animations to finish
                }
            })
        )
        gsap.set('.ball-shadow', {
            duration: 0.5,
            css: {
                opacity: 0.2,
            },
            ease: "none",
            stagger: {
                each: (duration / amt),
                repeat: -1
            }
        })
        gsap.set('.sphere', {
            duration: 0.5,
            css: {
                opacity: 1,
            },
            ease: "none",
            stagger: {
                each: (duration / amt),
                repeat: -1
            }
        })

        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();

    }

    /**
     * checks if the version will be unmomunted
     */
    componentWillUnmount() {
        clearInterval(this.timeout);
        window.removeEventListener('scroll', this.handleScroll);
    }

    /**
     * handles if the viewport has been scrolled
     */
    handleScroll() {
        this.checkIfInViewport("fade");
    }

    render() {
        return (
            <div className="about-wrapper">
                <div className="about-and-spheres">
                    <div className='about-me-container'>
                        <div className="inner-container">
                            <h2 id="about-title" className="fade sfproSB">About Me</h2>
                            <p  id="about-description" className="fade sfpro">
                                Aside from a passion for computer science, I'm a person who loves to <span className="sfproB traveler">travel.</span> I'm a creative <span className="sfproB stop-motion">stop-motion</span> filmmaker. 
                                I grew a skill for <span className="sfproB video-editing">video editing.</span> I have an aspiration to become a <span className="sfproB machine-learning">artificial inteligence</span> engineer, 
                                wanting to create innovative solutions for modern issues that'll last until the future.
                            </p>
                        </div>
                    </div>
                    <div className="spheres-wrapper">

                        <svg className="path-container" fill="white" width="100%" viewBox="0 0 560 180">
                            <path id="path" d="M 0 176 A 8 4 0 0 0 560 180 A 8 4 0 0 0 0 176 Z" ></path>
                        </svg>

                        <div>
                            <div className="middle"></div>
                            <div className="middle-shadow"></div>
                        </div>

                        <div className="ball-shadow"></div>
                        <div className="ball-shadow"></div>
                        <div className="ball-shadow"></div>
                        <div className="ball-shadow"></div>
                        <div className="ball-shadow"></div>
                        <figure onClick={() => this.clickHandler("resale-sphere")} id="resale-sphere" className="red-sphere sphere"></figure>
                        <figure onClick={() => this.clickHandler("traveler-sphere")} id="traveler-sphere" className="blue-sphere sphere"></figure>
                        <figure onClick={() => this.clickHandler("ms-sphere")} id="ms-sphere" className="purple-sphere sphere"></figure>
                        <figure onClick={() => this.clickHandler("stop-motion-sphere")} id="stop-motion-sphere" className="green-sphere sphere"></figure>
                        <figure onClick={() => this.clickHandler("video-editing-sphere")} id="video-editing-sphere" className="yellow-sphere sphere"></figure>
                    </div>
                    <a className="fade about-niche-info sfproB">click on a sphere to explore my niches</a>
                </div>

                <div className="about-me-section-description">
                    <div id="traveler" className="about-me-info">
                        <a className="sfproSB">Traveler</a>
                        <p className="sfproB">
                            One of my deepest desires is to explore the world. I enjoy learning different cultures and exploring new environments that are different from my own<br/>So far, I've traveled to:</p>
                        <ul className="sfproB travel-list">
                            <li>Czech Republic </li>
                            <li>England</li>
                            <li>France</li>
                            <li>Mexico</li>
                            <li>Canada</li>
                            <li>Italy</li>
                            <li>South Korea</li>
                        </ul>
                        <p>
                            When exploring a new country, I challenge myself to learn new words and phrases that are apart of that language, hopeful to one day
                            visit that country again without a language barrier. 
                        </p>
                    </div>
                    <div id="machine-learning" className="about-me-info">
                        <a className="sfproSB">Machine Learning</a>
                        <p className="sfproB">my name is Theodore Kremer, I go by Theo, and I have a deep passion for computer science.
                            Specifically, artificial inteligence. Creating innoavtive solutions for today’s tomorrow is my goal
                            and computer science is my tool</p>
                    </div>
                    <div id="stop-motion" className="about-me-info">
                        <a className="sfproSB">Stop Motion</a>
                        <p className="sfproB">
                            I find excitment in seeing things grow. By combining thousands of pictures together, I can watch as these pictures, 
                            meaningless alone, <span className="stop-motion">develop</span> into vass stories for people of all ages to understand and enjoy. and making the lighting as well as props.
                            <br/>
                            <br/>For every story, I <span className="stop-motion">developed</span> a comic book of illustrations
                            <br/>For every illustration, I took note of a possible camera approach
                            <br/>For every approach, I <span className="stop-motion">organized</span> the resources I had available
                            <br/>
                            <br/>
                            I began using the computer to create visual effects, perform video edits, and design covers with photoshop
                            <br/>
                            Eventually <span className="stop-motion">creating websites</span> for my films.
                        </p>
                    </div>
                    <div id="resale" className="about-me-info">
                        <a className="sfproSB">Reselling</a>
                        <p className="sfproB">Between 2019 to 2022, reselling limited-edition items was my source of income. To be <span className="resale">faster</span> then everyone else, I <span className="resale">developed</span> an automated software to perform actions in <span className="resale">miliseconds</span> which would take a human minutes. This program eventually became <span className="resale">Kudo</span></p>
                        <a className="sfproSB">Investments</a>
                        <p className="sfproB">At a minimum, 50% of the income I'd make from reselling I would re-invest into a stock-market portfolio for long term investments</p>
                    </div>
                    <div id="video-editing" className="about-me-info">
                        <a className="sfproSB">Video Editing</a>
                        <p className="sfproB">
                            After learning how to advance my stop-motion films.
                            Before programming, my passion was for video editing</p>
                    </div>
                </div>
            </div>
        )
    }
}