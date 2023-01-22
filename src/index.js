import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts.css'
import { Welcome } from './Landing/Welcome';
import { Coding } from './Landing/Code';
import { Project } from './projects/Project'
import { AboutMe } from './AboutMe/AboutMe'
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
          gradient={['#85a3ff', '#4a7dff']}
          sections={[
            {
              title: "Involvement",
              subtitle: "fullstack developer - UI designer",
              description: `Created webscraping API's to assist in managing online businesses\n\nDeveloped parsing algorithms to convert JSON files for other \nsoftware applications to read\n\nBuilt a web bot to simulate human actions / movements in \norder to efficiently solve Google's CAPTCHA\n\nDesigned and coded user-friendly GUI including\n an entire library of usable object animations`
            },
            {
              title: "Languages & Skills",
              skills: ['Java', 'Python', 'Selenium', 'PHP', 'HTML', 'CSS', 'JavaScript', 'Git']
            }
          ]}
        />
        <Project
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
        />
        <Project
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
        />

      </div>

      <AboutMe/>
      {/* <div className="layer-test3">
       
        </div> */}


    </div>
  </ParallaxProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
