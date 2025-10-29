import Header from "./components/Header";
import Hero from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";

export default function Home() {
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
      <Header title="Projects that speak for themselves"></Header>
      
    </>
  );
}
