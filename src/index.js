import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts.css'
import { Welcome } from './Landing/Welcome';
import { Coding } from './Landing/Code';
import { Project } from './projects/Project'
import { ProjectList } from './projects/ProjectList';
import { AboutMe } from './AboutMe/AboutMe'
import { Education } from './Education/Education'
import { Experience } from './Experience/Experience'
import { Overview } from './Overview/Overview'
import reportWebVitals from './reportWebVitals';
// import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { ParallaxProvider } from 'react-scroll-parallax';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ParallaxProvider>
    <div>
      <div className="fixed-parent">
        <Welcome />
      </div>

      <div className="fixed-parent">
        {/* <Coding /> */}
      </div>

      <div className="fixed-parent">
        {/* <div className="featured-project-title">
          <a className="sfproSB">Featured Project</a>
          <p className="sfproB">a project I am most proud about</p>
        </div> */}
        <Project
          projectTitle="Kudo"
          projectDescription="E-Commerce Manager"
          site="https://kudotools.com"
          download="https://github.com/TeedsK/Kudo-Download/releases"
          gradient={['#85a3ff', '#4a7dff']}
          sections={[
            {
              title: "Involvement",
              subtitle: "fullstack developer - UI designer",
              description: `Created webscraping API's to assist in managing online businesses\n\nDeveloped parsing algorithms to convert JSON files for other \nsoftware applications to read\n\nBuilt a web bot to simulate human actions / movements in \norder to efficiently solve Google's CAPTCHA\n\nDesigned and coded user-friendly GUI including\n an entire library of usable object animations`
            },
            {
              title: "Languages and Skills",
              skills: ['Java', 'Python', 'Selenium', 'PHP', 'HTML', 'CSS', 'JavaScript', 'Git']
            }
          ]}
        />
        {/* <Project
          projectTitle="RelationFlix "
          projectDescription="Photo and Video sharing Website"
          site="https://kudotools.com"
          download="https://github.com/TeedsK/Kudo-Download/releases"
          gradient={['#f775e8', '#ec5c77']}
          sections={[
            {
              title: "Involvement",
              subtitle: "frontend developer",
              description: `Created a hosting website for photo's and pictures to be dynamically uploaded\n\nUsed React to develop the UI\n\nUsed YouTube's AI to allow linked videos`
            },
            {
              title: "Languages & Skills",
              skills: ["React", "CSS", "JavaScript"]
            }
          ]}
        /> */}
        {/* <Project
          projectTitle="Pathfinder"
          projectDescription="Represenation of a Shortest Path Algorithm"
          site="https://kudotools.com"
          download="https://github.com/TeedsK/Kudo-Download/releases"
          gradient={['#11efcb', '#854ff3']}
          sections={[
            {
              title: "Involvement",
              subtitle: "full-stack developer",
              description: `Through data structures and algorithms `
            },
            {
              title: "Languages & Skills",
              skills: ["React", "HTML", "CSS", "JavaScript"]
            }
          ]}
        /> */}

      </div>

      <ProjectList>

      </ProjectList>

      <AboutMe />

      <Experience
        workplaces={[
          {
            companyName: "Tippett Studios",
            companyDescription: "VFX and Animation Studio",
            companyWebsite: "https://www.tippett.com/",
            yearsWorked: "2017-2018",
            myContributions: 
`Built visual effect props for an Academy Award Winning CGI and special effects production company\n
Assisted in the creation of the stop-motion animated feature film, Mad God\n
Worked alongside the most creative minds in animated filmmaking`,
            myRole: "Intern",
          },
          {
            companyName: "Rodina Consulting",
            companyDescription: "Cloud Based Consulting Componany",
            companyWebsite: "https://www.rodinaconsulting.com/",
            yearsWorked: "2018-2022",
            myContributions: 
`Trained non-technical team members in understanding the functionalities of company APIs\n
Researched the design of billing system integration between business applications\n
Designed then coded invoices to format document output per requirements\n
Investigated the feasibility to customize Wix website templates to improve the overall SEO\n`,
            myRole: "Computer Consultant",
          },
          {
            companyName: "SOMETHING WORKPLACE",
            companyDescription: "VFX and Animation Studio",
            companyWebsite: "https://www.tippett.com/",
            yearsWorked: "2017-2018",
            myContributions: ``,
            myRole: "Intern",
          },

        ]}>

      </Experience>

      <Education></Education>

      <Overview></Overview>


    </div>
  </ParallaxProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
