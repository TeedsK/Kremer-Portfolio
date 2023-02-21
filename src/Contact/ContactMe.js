import React from "react";
import './ContactMe.css'
import { gsap } from "gsap";

function ContactInput(props) {
    return (
        <div style={{ width: props.width }} className="sfpro input-wrapper input-effect">
            <input className="info-input" type="text" placeholder="" required />
            <label>{props.text}</label>
            <span className="focus-border"></span>
        </div>
    )
}

export class ContactMe extends React.Component {

    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            animationRan: false
        }
    }

    /**
     * Checks if an element is in the viewport
     * 
     * @param {*} className - the name of the class to check if it's in the viewport
     */
    checkIfInViewport = (className) => {

        const element = document.getElementById("animated-svg");

        const rect = element.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight) - ((window.innerHeight || document.documentElement.clientHeight) * 0.356);
        const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);

        if (vertInView) {

            if(!this.state.animationRan) {
                let object1 = document.getElementById('animated-svg');
                let svg = object1.contentDocument.getElementById('eAp0ERelTqN1');
                if(svg != null) {
                    this.setState({
                        animationRan: true
                    })
                    svg.svgatorPlayer.play();
                    gsap.to("#cnt-msg-title", {
                        duration: 0.75,
                        delay: 0.95,
                        backgroundPosition: "0% 50%",
                        ease: "power1.out",
                    })
                    gsap.to("#cnt-msg-send-btn", {
                        duration: 1.0,
                        delay: 2.9,
                        width: "14vw",
                        marginLeft: "2vw",
                        ease: "power1.out",
                        onComplete: () => {
                            gsap.to("#cnt-msg-send-btn", {
                                duration: 0.5,
                                ease: "power1.inOut",
                                width: "12vw",
                                marginLeft: "0vw",
                            })
                        }
                    })
                    gsap.to("#cnt-msg-send-btn-text", {
                        duration: 1.5,
                        delay: 2.9,
                        marginLeft: "-1.5vw",
                        ease: "power1.out",
                    })
                    gsap.to("#cnt-btn-arrow-wrapper", {
                        duration: 0.75,
                        delay: 2.9,
                        marginLeft: "8.4vw",
                        ease: "power1.out",
                    })
                    
                }
            }
            
        } else {

            if(this.state.animationRan) {
                let object1 = document.getElementById('animated-svg');
                let svg = object1.contentDocument.getElementById('eAp0ERelTqN1');
                if(svg != null) {
                    svg.svgatorPlayer.restart();
                    svg.svgatorPlayer.pause();
                    gsap.to("#cnt-msg-title", {
                        duration: 0.3,
                        backgroundPosition: "100% 50%"
                    })
                    gsap.to("#cnt-msg-send-btn", {
                        duration: 0.3,
                        width: "12vw",
                        marginLeft: "0vw"
                    })
                    gsap.to("#cnt-msg-send-btn-text", {
                        duration: 0.3,
                        marginLeft: "0vw"
                    })
                    gsap.to("#cnt-btn-arrow-wrapper", {
                        duration: 0.3,
                        marginLeft: "-13vw"
                    })
                    this.setState({
                        animationRan: false
                    })
                }
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
        this.checkIfInViewport("contact-airplane-animation");
    }

    render() {
        return (
            <div className="contact-me-wrapper">
                {/* <object className="contact-airplane-animation" type="image/svg+xml" data="/images/PaperAirplane.svg"></object> */}
                <object id="animated-svg" type="image/svg+xml" data="/images/PaperAirplane.svg"></object>

                <div className="contact-me-header">
                    <a className="sfproSB">Send me a<span id="cnt-msg-title"> Message</span></a>
                    <p className="sfpro">fill out the information below so I know how to reach back to you then press send message and I'll recieve an email</p>
                </div>
                {/* <form> */}
                <div className="cnt-row contact-me-first-row">
                    <ContactInput width={"25vw"} text="First Name" />
                    <div className="seperator" />
                    <ContactInput width={"25vw"} text="Last Name" />
                </div>
                <div className="cnt-row contact-me-second-row">
                    <ContactInput width={"55vw"} text="Description" />
                </div>
                <div className="cnt-row contact-me-third-row">
                    <div id="cnt-msg-send-btn">
                        <a id="cnt-msg-send-btn-text" className="sfpro">send message</a>
                        <div id="cnt-btn-arrow-wrapper">
                            <svg className="exp-ar-ani" id="bgIWRvPa5dV1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
                                <g className="exp-ar-ani" id="bgIWRvPa5dV2_to" transform="translate(82.819275,150)">
                                    <g className="exp-ar-ani" id="bgIWRvPa5dV2_ts" transform="scale(0.895743,0.895743)">
                                        <path className="exp-ar-ani" id="bgIWRvPa5dV2" d="M0,0L150,150L0,300" transform="translate(-75,-150)" fill="none" stroke="white" strokeWidth="26" strokeLinecap="round" strokeMiterlimit="7" />
                                    </g>
                                </g>
                                <path className="exp-ar-ani" id="bgIWRvPa5dV3" d="M323.316233,150h-303.41647" transform="matrix(-.665118 0 0-1.000008 262.589828 300.0012)" fill="none" stroke="white" strokeWidth="26" strokeLinecap="round" strokeDashoffset="303.42" strokeDasharray="303.42" />
                            </svg>

                        </div>
                    </div>
                </div>
                {/* </form> */}
            </div>
        )
    }
}