import Header from "./components/Header";
import Hero from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import ProjectsCarousel from './components/ProjectsCarousel';
import { Project } from './classes/Projects';
import CTA from './components/CTA';
import Footer from "./components/Footer";
import Timeline from "./components/Timeline";
import { TimelineItem } from "./classes/TimelineClass";

export default function Home() {
  const projects: Project[] = [
    {
      title: "Project 1",
      description: "Description for project 1",
      buttonContent: "View Project",
      link: "/project-1",
      thumbnail: "/Images/nextjs-logo.png",
      isIframable: false
    },
    {
      title: "Project 2",
      description: "Description for project 2",
      buttonContent: "View Project",
      link: "/project-2",
      thumbnail: "/Images/react-logo.png",
      isIframable: false
    },
    {
      title: "Project 3",
      description: "Description for project 3",
      buttonContent: "View Project",
      link: "/project-3",
      thumbnail: "/Images/astro-logo.png",
      isIframable: false
    },
    {
      title: "Project 4",
      description: "Description for project 4",
      buttonContent: "View Project",
      link: "/project-4",
      thumbnail: "/Images/logo.png",
      isIframable: false
    },
  ];


  return (
    <>
      <Navbar />
      <Hero
        title="<h1>Modern Websites Built with <span>Next.js, Astro & React</span> – <b>KPZsProductions</b> </h1>"
        desc="<p>We create <span>fast, responsive, and visually stunning websites powered by Next.js, Astro, React, 
and Tailwind CSS.</span>Boost your SEO, performance, and brand identity with a website that stands out in today’s digital world.</p>"
        ctaButtonContent="Content"
        ctaButtonLink="/contact"
      />
      <Header title="Crafting fast, beautiful, and scalable web experiences"></Header>
      <Grid
        content_1="Designed and coded from scratch for your brand."
        content_2="Lightning-fast loading and perfect Lighthouse scores."
        content_3="Visibility that drives real results."
        content_4="Reliable updates and long-term partnership."
        header_1="Custom Websites"
        header_2="Performance Optimization"
        header_3="SEO & Analytics Setup"
        header_4="Maintenance & Support"
      />
      <Header title="Why work with KPZsProductions?"></Header>
      <Grid
        content_1="Modern frameworks like Next.js and Astro."
        content_2="Speed, SEO, and user experience."
        content_3="Code using React and Tailwind CSS."
        content_4="Communication and delivery on time."
        header_1="Built with"
        header_2="Focus on"
        header_3="Clean, scalable"
        header_4="Transparent"
      />
      <Header title="Our Development Process"></Header>

      <Header title="Projects that speak for themselves"></Header>
      <ProjectsCarousel ProjectsShown={projects}></ProjectsCarousel>
      <CTA title="Ready to build something amazing?"
        description="Let’s create a website that drives results fast, modern, and built for growth."
        ctaButtonContent="Get a Free Quote or Contact Us Now"
        ctaButtonLink="/contact"
      ></CTA>
      <Footer />
    </>
  );
}
