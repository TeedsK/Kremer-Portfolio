import React from "react";
import './ContactMe.css'

function ContactInput(props) {
    return (
        <div style={{width: props.width}} className="sfpro input-wrapper input-effect">
            <input className="info-input" type="text" placeholder="" required/>
            <label>{props.text}</label>
            <span className="focus-border"></span>
        </div>
    )
}

export class ContactMe extends React.Component {

    render() {
        return (
            <div className="contact-me-wrapper">
                <div className="contact-me-header">
                    <a className="sfproSB">Send me a Message</a>
                    <p className="sfpro">fill out the information below so I know how to reach back to you then press send message and I'll recieve an email</p>
                </div>
                {/* <form> */}
                <div className="cnt-row contact-me-first-row">
                    <ContactInput width={"25vw"} text="First Name"/>
                    <div className="seperator"/>
                    <ContactInput width={"25vw"} text="Last Name"/>
                </div>
                <div className="cnt-row contact-me-second-row">
                    <ContactInput width={"55vw"} text="Description"/>
                </div>
                <div className="cnt-row contact-me-third-row">

                </div>
                {/* </form> */}
            </div>
        )
    }
}