import React from "react";
import './Education.css'

export class Education extends React.Component {
    render() {
        return(
            <div className="education-container">
                {/* <object className="education-animation-background" type="image/svg+xml" data="/images/CAtoUT.svg"></object> */}
                <div className="education-text-wrapper">
                    <a className="fade sfproSB">Education</a>
                    <br/>
                    <img className="fade" width="100vw" src="/images/utah.png"></img>
                    <p className="fade sfpro">
                        As a <span className="sfproB black">Computer Science</span> student at the <span className="sfproSB uofu-red">University of Utah,</span> I have been exposed to a 
                        dynamic and challenging curriculum that emphasizes <span className="sfproB black">hands-on learning</span> and <span className="sfproB black">team-based</span> projects.
                        I developed a strong foundation in the field, as well as valuable skills such as <span className="sfproB black">critical thinking</span>, <span className="sfproB black">problem-solving</span>, and <span className="sfproB black">effective collaboration</span>. 
                    </p>
                </div>
            </div>
        )
    }
}