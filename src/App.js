import React, { Component } from "react";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certificate from "./components/Certificate";
import Skills from "./components/Skills";
import Resume from "./components/Resume";

class App extends Component {
  render() {
    const person = {
      name: "Jaime Vélez Escandón",
      profession: "FullStack JavaScript Developer",
      bio: "Telematics Engineer | FullStack JavaScript Developer | DevOps & SecOps appassionate | Services Engineer",
      address: "Yumbo, Valle del Cauca - Colombia.",
      social: [
        { name: "instagram", url: "https://instagram.com/naranjazombie" },
        { name: "twitter", url: "https://twitter.com/naranjazombie" },
        { name: "github", url: "https://github.com/jaimevlz" },
        { name: "linkedin", url: "https://www.linkedin.com/in/jaime-velez-escandon/" },
      ],
      resume: [
        {
          resumeTitle: "Telematics Engineer",
          resumeDescription:
            "Telematics Engineer with interest in working in the areas of Design and Implementation of IT Services. Network management and networking services. Network supporting. With interest and passionate about DevOps or SecOps cycle and it’s deployment tools. With experience in nontraditional virtualization tools as Docker and Vagrant using different platforms. Docker management through Kubernetes and monitoring tools. Traditional networking deployment. Auto response technologies. Private cloud deployment using Openstack. Deploy networking resources and services using tools of infrastructure as code. With communication skills, understanding, fast learner person, interpersonal relationships, teamwork, and leadership.",
        }],
      experience: [
        {
          jobTitle: "IT Leader",
          company: "ESPY S.A. E.S.P.",
          startDate: "Dec 2019",
          endDate: "Present",
          jobDescription:
            "Switching, routing, and networking configuration. Unix/Linux and Windows provisioning. Active Directory management. Database Administrator. Radio Frequency Antennas Management. Design and deploy a network service.Design the security and privacy policies. Deploy a radio frequency antennas network. Design the IT Investment Plan.",
        },
        {
          jobTitle: "Network Engineer",
          company: "Yumbo - Mayor's Office",
          startDate: "Jul 2018",
          endDate: "Oct 2019",
          jobDescription:
            "Switching, routing, and networking configuration. Unix/Linux and Windows provisioning. Active Directory management. Database Administrator.Deploy a private cloud using OpenStack. Design and deploy a network service. Design the security and privacy policies. On Premise Service migration to Microsoft Azure IaaS.",
        },
        {
          jobTitle: "Services Engineer (Internship)",
          company: "EMCALI EICE E.S.P.",
          startDate: "Nov 2017",
          endDate: "May 2018",
          jobDescription:
            "Unix/Linux. Docker. AWS Platform. NodeJS. Telegram Bots Automation. Develop an automation tool to send reports in telegram (NodeJS + Telegram API). AWS Cloud – IaaS management. Develop a LDAP reader in Java. On Premise Service migration to AWS IaaS. Grafana + Zabbix reports integration.",
        },
      ],
      education: [
        {
          degree: "Telematic Engineer",
          institution: "Icesi University",
          startDate: "Jul 2012",
          endDate: "Ago 2018",
          description:
            "Graduation project: Evaluation of large-scale infrastructure monitoring tools based on virtual containers.",
        },
        {
          degree: "Graphic Designer",
          institution: "Fundación Academia de Dibujo Profesional",
          startDate: "Jan 2015",
          endDate: "Decenber 2017",
          description:
            "Not finished.",
        },
      ],
      certificate: [
        {
          name: "Master React: ReactJS, Hooks, MERN, NodeJS, JWT+",
          institution: "Udemy",
          date: "2022",
        },
        {
          name: "Introduction to AWS Cloud",
          institution: "Platzi",
          date: "2021",
        },
        {
          name: "Apps Deployment",
          institution: "Platzi",
          date: "2021",
        },
        {
          name: "Introduction to Google Cloud Platform",
          institution: "Platzi",
          date: "2021",
        },
        {
          name: "Time Management",
          institution: "Platzi",
          date: "2021",
        },
        {
          name: "Introduction to IBM Cloud",
          institution: "Platzi",
          date: "2021",
        },
        {
          name: "Linux Servers Management",
          institution: "Platzi",
          date: "2021",
        },
        {
          name: "Terminal and Command Line",
          institution: "Platzi",
          date: "2021",
        },
        {
          name: "Backend in PHP + MySQL using Docker",
          institution: "Udemy",
          date: "2021",
        },
        {
          name: "Google Mobile apps Development",
          institution: "Google Activate",
          date: "2019",
        },
        {
          name: "Google Cloud Computing",
          institution: "Google Activate",
          date: "2019",
        },
        {
          name: "Information Security and Privacy",
          institution: "EMAVI",
          date: "2018",
        },
        {
          name: "Computer Maintenance",
          institution: "CETENAL",
          date: "2012",
        },
      ],
      skills: [
        { name: "HTML", percentage: "90%" },
        { name: "CSS", percentage: "90%" },
        { name: "JavaScript", percentage: "70%" },
        { name: "React", percentage: "70%" },
        { name: "Python", percentage: "50%" },
        { name: "Bash Scripting", percentage: "70%" },
        { name: "Docker", percentage: "70%" },
        { name: "Terraform", percentage: "50%" },
        { name: "AWS", percentage: "60%" },
      ],
    };

    return (
      <header>
        <div className="wrapper">
          <div className="sidebar">
            <About
              name={person.name}
              profession={person.profession}
              bio={person.bio}
              address={person.address}
              social={person.social}
            />
          </div>

          <div className="content-wrapper">
            <div className="content">
              <Resume resume={person.resume}/>
              <Experience experience={person.experience} />
              <Education education={person.education} />
              <Certificate certificate={person.certificate} />
              <Skills skills={person.skills} />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default App;
