import { Project } from "../classes/Projects";
import ProjectsGrid from "../components/ProjectsGrid";
import Hero from "./../components/HeroSection";
import Header from "./../components/Header";
import Grid from "./../components/Grid";
import CTA from "./../components/CTA";

export default function Portfolio() {
  const projects: Project[] = [
    {
      title: "Project 1",
      description: "Description for project 1",
      buttonContent: "View Project",
      link: "/project-1",
      thumbnail: "/Images/nextjs-logo.png",
      isIframable: false,
    },
    {
      title: "Project 2",
      description: "Description for project 2",
      buttonContent: "View Project",
      link: "/project-2",
      thumbnail: "/Images/react-logo.png",
      isIframable: false,
    },
    {
      title: "Project 3",
      description: "Description for project 3",
      buttonContent: "View Project",
      link: "/project-3",
      thumbnail: "/Images/astro-logo.png",
      isIframable: false,
    },
    {
      title: "Project 4",
      description: "Description for project 4",
      buttonContent: "View Project",
      link: "/project-4",
      thumbnail: "/Images/logo.png",
      isIframable: false,
    },
  ];

  return (
    <>
      <Hero
        title="Showcasing My Work – Websites That Perform & Inspire"
        desc="At KPZsProductions, I craft modern, fast, and visually appealing websites using Next.js, Astro, React, and Tailwind CSS. Here’s a selection of projects that demonstrate my skills, creativity, and dedication to delivering high-quality digital experiences."
        ctaButtonContent="Get Your Website Today"
        ctaButtonLink="/contact"
      ></Hero>
      <Header title="Featured Projects"></Header>

      <ProjectsGrid projects={projects}></ProjectsGrid>
      <Header title="What You’ll Find Here"></Header>
      <Grid
        header_1="Modern Websites"
        header_2="Custom Solutions"
        header_3="Technical Excellence"
        header_4="Attention to Detail"
        content_1="Clean design, fast performance, responsive layouts."
        content_2="Each project tailored to the client’s goals and audience."
        content_3="Built with the latest web technologies for scalability and SEO."
        content_4="Every project refined for aesthetics, usability, and speed."
      ></Grid>
      <CTA
        title="Ready to build something amazing?"
        description="Let’s create a website that drives results fast, modern, and built for growth."
        ctaButtonContent="Get a Free Quote or Contact Us Now"
        ctaButtonLink="/contact"
      ></CTA>
    </>
  );
}
