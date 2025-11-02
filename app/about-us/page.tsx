import Hero from "../components/HeroSection";
import Timeline from "../components/Timeline";
import { TimelineItem } from "./../classes/TimelineClass";
import Header from "./../components/Header";
import CitedText from "./../components/CitedText";
import Grid from "./../components/Grid";
import ImageGrid from "../components/ImageGrid";
import CTA from "../components/CTA";

const timelineItems: TimelineItem[] = [
  {
    year: 2020,
    title: "Phase 1",
    description: "Initial planning and concept.",
  },
  { year: 2021, title: "Phase 2", description: "Development and testing." },
  { year: 2022, title: "Phase 3", description: "Deployment and launch." },
  {
    year: 2023,
    title: "Phase 4",
    description: "Post-launch support and maintenance.",
  },
];

export default function AboutUs() {
  return (
    <>
      <Hero
        title="Turning Ideas Into Fast, Modern, and Scalable Websites"
        desc="I’m Kacper Duda, the founder and developer behind KPZsProductions — a creative studio focused on building fast, modern, and visually stunning websites powered by Next.js, Astro, React, and Tailwind CSS. My goal is simple: craft web experiences that are not only beautiful but also lightning-fast and SEO-friendly."
        ctaButtonContent="Let’s build your website together"
        ctaButtonLink="/contact"
      ></Hero>

      
      <Timeline items={timelineItems}></Timeline>
      <CitedText content="My mission is to build websites that inspire, perform, and grow with your business. Each project is unique, and I treat every website as a long-term investment in your digital presence — optimized for speed, SEO, and design consistency."></CitedText>
      <Header title="Values"></Header>
      <Grid
        header_1="Precision"
        content_1="Every detail matters from pixels to performance"
        header_2="Performance"
        content_2="Fast websites convert better and I make sure they do."
        header_3="Transparency"
        content_3="You always know what’s being built and why."
        header_4="Modern Design"
        content_4="Clean, bold, and tailored to your brand."
      ></Grid>
      <Header title="Technologies"></Header>
      <ImageGrid></ImageGrid>
      <CTA title="Ready to build something amazing?" description="Let’s create a website that drives results fast, modern, and built for growth." ctaButtonContent="Get a Free Quote or Contact Us Now" ctaButtonLink="/contact"></CTA>
    </>
  );
}
