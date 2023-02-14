import React from "react";

import "./ProjectList.css"
import { gsap } from "gsap";

function ProjectCard(props) {
    return (
        <div className="slideshow-card">
            <div className="slideshow-header">
                <a className="rubikBF">{props.title}</a>
                <div onClick={() => props.clickHandler(props.index)} className="expand_button">
                    <div className="expand-arrow">
                        <span className="arrow-middle"></span>
                        <span className="arrow-upwards"></span>
                    </div>
                </div>
            </div>
            <div className="card_under_text">
                <div className="item_info">
                    <div></div>
                    <a className="small_title rubikBF">{props.subtitle}</a>
                    <div className="card-gradient"></div>
                    <a className="small_description rubikf">{props.description}</a>
                </div>
                <div className="skills-info">
                    <a className="small_title rubikBF">{props.footerTitle}</a>
                    <a className="small_description rubikf">{props.footerDescription}</a>
                </div>
            </div>
        </div>
    )
}

export class ProjectList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cardIndex: -1
        }
    }

    minimizeCard = (index) => {
        const parent = document.getElementsByClassName('slideshow-card')[index];
        const gradient = document.getElementsByClassName('card-gradient')[index];
        const skills = document.getElementsByClassName('skills-info')[index];

        gsap.to(parent, {
            duration: 1,
            height: "30vh",
            width: "40%",
            minWidth: "40%",
            margin: "5vh 2vw"
        })
        gsap.to(gradient, {
            duration: 1,
            opacity: 1
        })
        gsap.to(skills, {
            duration: 1,
            opacity: 0
        })

        document.getElementsByClassName('expand-arrow')[index].getElementsByClassName('arrow-middle')[0].style.transform = "rotate(180deg)";
        document.getElementsByClassName('expand-arrow')[index].getElementsByClassName('arrow-upwards')[0].style.transform = "rotate(-90deg)";
    }

    projectSelection = (index) => {

        const parent = document.getElementsByClassName('slideshow-card')[index];
        const gradient = document.getElementsByClassName('card-gradient')[index];
        const skills = document.getElementsByClassName('skills-info')[index];

        if (this.state.cardIndex == index) {
            this.minimizeCard(index);
            this.setState({
                cardIndex: -1
            })
        } else {
            if (this.state.cardIndex != -1) {
                this.minimizeCard(this.state.cardIndex);
            }
            gsap.to(parent, {
                duration: 0.6,
                height: "40vh",
                width: "60%",
                minWidth: "60%",
                margin: "5vh 1vw",
                ease: "power2.out",
            })
            gsap.to(gradient, {
                duration: 0.6,
                opacity: 0
            })
            gsap.to(skills, {
                duration: 0.6,
                opacity: 1
            })
            document.getElementsByClassName('expand-arrow')[index].getElementsByClassName('arrow-middle')[0].style.transform = "rotate(45deg)";
            document.getElementsByClassName('expand-arrow')[index].getElementsByClassName('arrow-upwards')[0].style.transform = "rotate(-45deg)";
            this.setState({
                cardIndex: index
            })
        }
    }

    render() {
        return (
            <div className="project-list-background">
                <div className="project-list-info">
                    <a className="sfproSB project-list-title fade">Project List</a>
                    <p className="sfproB project-list-subtitle fade">scroll through the variety of projects I've created throughout the years</p>
                </div>
                <div className="under-white"></div>
                <div className="gradient-containers left-gradient-containers">
                    <div className="gradient-left-1"></div>
                    <div className="gradient-left-2"></div>
                </div>
                <div className="gradient-containers right-gradient-containers">
                    <div className="gradient-right-1"></div>
                    <div className="gradient-right-2"></div>
                </div>

                <section className="fade">
                    <ProjectCard clickHandler={this.projectSelection} index={0} title="NASA Robotics Competition" subtitle="Utah Student Robotics" description="Working with a team of 6 others, we built then coded an autonomous and remote controlled Robot to compete in NASA's LUNABOTICS mining compeition" footerTitle="languages used" footerDescription="Python"></ProjectCard>
                    <ProjectCard clickHandler={this.projectSelection} index={1} title="Apple - iPhone Development" subtitle="Apple's iPhone Application Workshop" description="A machine learning program that uses the A* algorithm to find the quickest path between a start and end point by assigning values to each node depending on their distance to the end point and their neighboring nodes" footerTitle="languages used" footerDescription="Python"></ProjectCard>
                    <ProjectCard clickHandler={this.projectSelection} index={2} title="Microsoft Excel / Google Sheets" subtitle="Dynamic Spreadsheet" description="..." footerTitle="languages & skills involved" footerDescription="C# and Git"></ProjectCard>
                    <ProjectCard clickHandler={this.projectSelection} index={3} title="Machine Learning" subtitle="Pathfinder AI" description="A machine learning program that uses the A* algorithm to find the quickest path between a start and end point by assigning values to each node depending on their distance to the end poinn dsjaknk ajsndkjn wqken ,msad ,makjxcnkjnq wkqnekqwne kasndm,as ,m,mzx ckjnq wkjenqwne kqwne kqnwke nqwke nqkwnejkqwnke nqkjw nekqwnek qwjk en and their neighboring nodes asdnweijnq wienq iwuenqiwu neiquwen ajksdn aksjndkjasnd iuqweiquwhe iquwne skadn kasjd dnkasjnd kjqwnekj qnkejnqwk jne dm, zx,cm z,x ckq kjenqwkenkqn emsd,mans d,ndkjqnwkjenqkwen ksnd,ma snd m,an" footerTitle="languages used" footerDescription="Python"></ProjectCard>
                    <ProjectCard clickHandler={this.projectSelection} index={4} title="Artificial Inteligence" subtitle="Tic Tac Toe AI" description="A machine learning program that uses the A* algorithm to find the quickest path between a start and end point by assigning values to each node depending on their distance to the end poinn dsjaknk ajsndkjn wqken ,msad ,makjxcnkjnq wkqnekqwne kasndm,as ,m,mzx ckjnq wkjenqwne kqwne kqnwke nqwke nqkwnejkqwnke nqkjw nekqwnek qwjk en and their neighboring nodes asdnweijnq wienq iwuenqiwu neiquwen ajksdn aksjndkjasnd iuqweiquwhe iquwne skadn kasjd dnkasjnd kjqwnekj qnkejnqwk jne dm, zx,cm z,x ckq kjenqwkenkqn emsd,mans d,ndkjqnwkjenqkwen ksnd,ma snd m,an" footerTitle="languages used" footerDescription="Python"></ProjectCard>
                    <ProjectCard clickHandler={this.projectSelection} index={5} title="Bezier Curve" subtitle="Graphic Design Tool" description="A machine learning program that uses the A* algorithm to find the quickest path between a start and end point by assigning values to each node depending on their distance to the end poinn dsjaknk ajsndkjn wqken ,msad ,makjxcnkjnq wkqnekqwne kasndm,as ,m,mzx ckjnq wkjenqwne kqwne kqnwke nqwke nqkwnejkqwnke nqkjw nekqwnek qwjk en and their neighboring nodes asdnweijnq wienq iwuenqiwu neiquwen ajksdn aksjndkjasnd iuqweiquwhe iquwne skadn kasjd dnkasjnd kjqwnekj qnkejnqwk jne dm, zx,cm z,x ckq kjenqwkenkqn emsd,mans d,ndkjqnwkjenqkwen ksnd,ma snd m,an" footerTitle="languages used" footerDescription="Python"></ProjectCard>
                    <ProjectCard clickHandler={this.projectSelection} index={6} title="Conways Game of Life" subtitle="Teebs" description="A machine learning program that uses the A* algorithm to find the quickest path between a start and end point by assigning values to each node depending on their distance to the end point and their neighboring nodes" footerTitle="languages used" footerDescription="Python"></ProjectCard>
                    <ProjectCard clickHandler={this.projectSelection} index={7} title="Computer Buddie Companion" subtitle="The second attempt at a portfolio website" description="A machine learning program that uses the A* algorithm to find the quickest path between a start and end point by assigning values to each node depending on their distance to the end point and their neighboring nodes" footerTitle="languages used" footerDescription="Python"></ProjectCard>
                    <ProjectCard clickHandler={this.projectSelection} index={8} title="Personal Website 2.0" subtitle="The first attempt at a portfolio website" description="A machine learning program that uses the A* algorithm to find the quickest path between a start and end point by assigning values to each node depending on their distance to the end point and their neighboring nodes" footerTitle="languages used" footerDescription="Python"></ProjectCard>
                    <ProjectCard clickHandler={this.projectSelection} index={9} title="Personal Website 1.0" subtitle="The second attempt at a portfolio website" description="A machine learning program that uses the A* algorithm to find the quickest path between a start and end point by assigning values to each node depending on their distance to the end point and their neighboring nodes" footerTitle="languages used" footerDescription="Python"></ProjectCard>
                </section>
            </div>
        )
    }
}