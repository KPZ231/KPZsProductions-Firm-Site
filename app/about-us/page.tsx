import Hero from "../components/HeroSection";
import Timeline from "../components/Timeline";
import { TimelineItem } from "./../classes/TimelineClass";

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
    </>
  );
}
