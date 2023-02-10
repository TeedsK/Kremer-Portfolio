import React from "react";
import './Welcome.css'

import './Pathfinder.css'
import { Pathfinder } from "./Pathfinder";



/**
 * This class represents the Welcome section on the landing page of the portfolio site
 * This is the first page a viewer will see
 * 
 * @author - Theo Kremer
 * @version - 1.0.0
 */
export class Welcome extends React.Component {

    componentDidMount() {
        const links = document.querySelectorAll(".hyper-links")
        links.forEach((element, i) => {
            element.addEventListener("mouseover", () => {
                links.forEach((ele, k) => {
                    if(i != k)
                        ele.style.opacity = "0.6";
                    else
                    ele.style.opacity = "1";
                })
            }, false);
            element.addEventListener("mouseout", () => {
                links.forEach((ele, k) => {
                    ele.style.opacity = "1";
                })
            }, false);
        })
    }

    imgClick = (link) => {
        window.open(link, '_blank');
    }

    render() {

        return (
            <div className="welcome-wrapper">
                <div className="welcome-header">
                    <div className="social-links">
                        <img src="/images/linkedin.png" onClick={this.imgClick.bind(this, "https://www.linkedin.com/in/ttkremer/")}></img>
                        <img src="/images/github.png" onClick={this.imgClick.bind(this, "https://github.com/TeedsK")}></img>
                        <img src="/images/twitter.png" onClick={this.imgClick.bind(this, "https://twitter.com/TeedsTK")}></img>
                        <img src="/images/instagram.png" onClick={this.imgClick.bind(this, "https://www.instagram.com/theo.kremer/")}></img>
                    </div>
                    <div className="hyper-links-wrapper sfpro blue">
                        <a className="hyper-links">projects</a>
                        <a className="hyper-links">about me</a>
                        <a className="hyper-links">experience</a>
                        <a className="hyper-links">education</a>
                        <a className="hyper-links">overview</a>
                        <div className="resume-wrapper">
                            <p>resume</p>
                        </div>
                    </div>
                </div>
                <div className="text-wrapper">
                    <div className="sfproB basic-description">
                        <a className="ani sfpro welcome-hello lg-text">Hello,</a>
                        <br />
                        <a className="ani sfpro welcome-hello lg-text">my name is</a>
                        <br />
                        <a className="ani sfproSB name">Theo Kremer</a>
                        <br />
                        <a className="ani lg-text">as a motivated, hands-on, and collaborative<span className="text-gradient gradient-1"> Software Developer</span></a>
                        <br />
                        <a className="ani lg-text">flexible, persistent and innovative <span className="text-gradient gradient-2">Debugger</span></a>
                        <br />
                        <a className="ani lg-text">I find the <span className="text-gradient gradient-3">best path</span> to a solution</a>
                    </div>
                </div>
                <Pathfinder></Pathfinder>
            </div>
        )
    }
}


