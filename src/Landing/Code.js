import React from 'react';
import "./Code.css"



const NEUTRAL = "#000000"
const COMMENT = '#3bb37f';
const COMMENT_TAG = '#2dea98';
const VARIABLE = "#5b8cd0";
const VARIABLE_NAME = "#1f4ae0";

/**
 * This class represents the coding section on the landing page of the portfolio site
 * 
 * @author - Theo Kremer
 * @version - 1.0.0
 */
export class Coding extends React.Component {

    /**
     * The constructor 
     * 
     * @param {*} props - any given properties
     */
    constructor(props) {
        super(props)

        const codeLines = [
            <span className="c-c">/**</span>,
            <span className="c-c">* SCROLL PAGE DOWN HERE</span>,
            <span className="c-c">*</span>,
            <span className="c-c">* <span className="c-ct">@author</span> - Theodore Kremer</span>,
            <span className="c-c">* <span className="c-ct">@version</span> - 1.0.0</span>,
            <span className="c-c">*/</span>,
            <span className="c-v">public class <span className="c-vn">PortfolioCreator</span> <span className="c-n">&#123;</span></span>,
            <span className="c-n"> </span>,
            <span className="c-c">  //global variables</span>,
            <span className="c-n">  <span className="c-v">private String</span> name, age, residency;</span>,
            <span className="c-n"> </span>,
            <span className="c-n">  <span className="c-o">PortfolioCreator()</span> &#123;</span>,
            <span className="c-n">      <span className="c-v">this.</span>name = <span className="c-s">“Theodore Kremer”</span></span>,
            <span className="c-n">      <span className="c-v">this.</span>age = <span className="c-s">“19”</span></span>,
            <span className="c-n">      <span className="c-v">this.</span>residency = <span className="c-s">“Berkeley, California”</span></span>,
            <span className="c-n">  &#125;</span>,
            <span className="c-n"> </span>,
            <span className="c-c">  /**</span>,
            <span className="c-c">  * This function creates a Portfolio Website</span>,
            <span className="c-c">  * including projects, about me, and more</span>,
            <span className="c-c">  */</span>,
            <span className="c-n">  <span className="c-v">private void </span><span className="c-o">createWebsite()</span> &#123;</span>,
            <span className="c-n">      <span className="c-v">Website </span>portfolio = <span className="c-vn">new <span className="c-o">Website<span className="c-vn">()</span>;</span></span></span>,
            <span className="c-n">      portfolio.<span className="c-o">build<span className="c-o">()</span>;</span></span>,
            <span className="c-n">  &#125;</span>,
            <span className="c-n"> </span>,
            <span className="c-c">  /**</span>,
            <span className="c-c">  * This starts the code</span>,
            <span className="c-c">  */</span>,
            <span className="c-n">  <span className="c-v">public static void </span><span className="c-o">main<span className="c-o">(</span><span className="c-vn">String</span><span className="c-a">[] </span><span className="c-an">args</span></span><span className="c-o">)</span> &#123;</span>,
            <span className="c-vn">      new <span className="c-o">PortfolioCreator<span className="c-vn">()</span>.createWebsite<span className="c-vn">()</span>;</span></span>,
            <span className="c-n">  &#125;</span>,
            <span className="c-n"> </span>,
            <span className="c-n">&#125;</span>,
        ]

        this.state = {
            lines: codeLines,
            animated: new Array(codeLines.length).fill(false),
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    /**
     * Animation to animate the element's text being typed out character by character
     * 
     * @param {*} element - the element to animate
     * @param {*} index - the index of the element saved in the array
     */
    typeValue = (element, index) => {
        if (!this.state.animated[index]) {

            this.state.animated[index] = true;
            const value = element.innerHTML;

            let i = 0;
            const typeInterval = setInterval(() => {
                element.innerHTML = value.substring(0, i);
                i++;
                if (i > value.length) {
                    clearInterval(typeInterval);
                }
            }, Math.random() * (100 - 50) + 50);
        }
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
                this.typeValue(elements[i], i);
            } else {

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
        clearInterval(this.timeout);
        window.removeEventListener('scroll', this.handleScroll);
    }

    /**
     * handles if the viewport has been scrolled
     */
    handleScroll() {
        this.checkIfInViewport("code-line");
    }

    /**
     * Renders the React.js component
     * 
     * @returns an element with the content
     */
    render() {

        const code = [];

        this.state.lines.forEach((ele, index) => {
            code.push(<p value={ele.innerHTML} className="code-line" key={index}>{ele}</p>)
        })

        return (
            <div className="coding-wrapper">
                <div className="coding-text-wrapper">
                    <pre className="codef">
                        {code}
                    </pre>
                </div>
            </div>
        )
    }
}