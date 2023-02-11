import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts.css'
import { Welcome } from './Landing/Welcome';
import { Coding } from './Landing/Code';
import { Project } from './Projects/Project'
import { ProjectList } from './Projects/ProjectList';
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
        <Project
          projectTitle="Kudo"
          projectDescription="E-Commerce Manager"
          site="https://kudotools.com"
          download="https://github.com/TeedsK/Kudo-Download/releases"
          gradient={['#f775e8', '#ec5c77']}
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

      </div>

      <ProjectList>

      </ProjectList>

      <AboutMe />

      <Experience
        section="1"
        rightOriented={true}
        title={"Experience"}
        positions={[0.9, 0.95, 1.0]}
        gradient={['#85a3ff', '#4a7dff']}
        description={
          <p className="sfpro fade">
            <span className="sfproB">Companies that have shaped my skills and teamwork</span><br/>
            Click on a card to learn about the companies where I honed my computer science expertise and developed valuable collaboration skills.
          </p>
        }
        path={"M66.11101,92.425 C64.52401,152.421 69.41501,263.969 148.57201,273.289 222.97701,282.015 456.15401,266.255 504.19601,104 536.46901,-5 430.00901,-19.944 296.79801,-4.688 137.93201,13.505 81.58701,80.47 66.83801,92.604"}
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

      <Experience
        section="2"
        delay={2.5}
        rightOriented={false}
        positions={[0.85, 0.9, 0.95, 1.0]}
        title={"Coursework"}
        gradient={['#85a3ff', '#4a7dff']}
          
        description={
          <p className="sfpro fade">
            <span className="sfproB">Classes that have fueled my growth</span><br/>
            Explore the classes I've taken that have contributed to my knowledge and skillset by clicking on a card header.
          </p>
        }
        
        path={"M -66.111 92.425 C -64.524 152.421 -69.415 263.969 -148.572 273.289 C -222.977 282.015 -456.154 266.255 -504.196 104 C -536.469 -5 -430.009 -19.944 -296.798 -4.688 C -137.932 13.505 -81.587 80.47 -66.838 92.604"}
        workplaces={[
          {
            companyName: "Algorithms and Data Structures",
            companyDescription: "CS2420 - University of Utah",
            companyWebsite: "https://www.tippett.com/",
            yearsWorked: "2022-2023",
            myContributions: 
`Built visual effect props for an Academy Award Winning CGI and special effects production company\n
Assisted in the creation of the stop-motion animated feature film, Mad God\n
Worked alongside the most creative minds in animated filmmaking`,
            myRole: "Intern",
          },
          {
            companyName: "Software Practices 1",
            companyDescription: "CS3500",
            companyWebsite: "https://www.rodinaconsulting.com/",
            yearsWorked: "2023-2023",
            myContributions: 
`Trained non-technical team members in understanding the functionalities of company APIs\n
Researched the design of billing system integration between business applications\n
Designed then coded invoices to format document output per requirements\n
Investigated the feasibility to customize Wix website templates to improve the overall SEO\n`,
            myRole: "Computer Consultant",
          },
          {
            companyName: "Autonomous Driving",
            companyDescription: "ROAR at UC Berkeley",
            companyWebsite: "https://www.rodinaconsulting.com/",
            yearsWorked: "2020-2021",
            myContributions: 
`Trained non-technical team members in understanding the functionalities of company APIs\n
Researched the design of billing system integration between business applications\n
Designed then coded invoices to format document output per requirements\n
Investigated the feasibility to customize Wix website templates to improve the overall SEO\n`,
            myRole: "Computer Consultant",
          },
          {
            companyName: "Robotics",
            companyDescription: "Berkeley City College",
            companyWebsite: "https://www.rodinaconsulting.com/",
            yearsWorked: "2020-2021",
            myContributions: 
`Trained non-technical team members in understanding the functionalities of company APIs\n
Researched the design of billing system integration between business applications\n
Designed then coded invoices to format document output per requirements\n
Investigated the feasibility to customize Wix website templates to improve the overall SEO\n`,
            myRole: "Computer Consultant",
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
