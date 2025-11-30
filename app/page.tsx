import Header from "./components/Header";
import Hero from "./components/HeroSection";
import Grid from "./components/Grid";
import ProjectsCarousel from './components/ProjectsCarousel';
import { Project } from './classes/Projects';
import CTA from './components/CTA';
import ProjectsGrid from "./components/ProjectsGrid";


export default function Home() {
  const projects: Project[] = [
    {
      title: "Whatnow!? - Chaos",
      description: "Interaktywna aplikacja imprezowa łącząca ludzi przez zabawne wyzwania i dynamiczną rozgrywkę",
      buttonContent: "Zobacz projekt",
      link: "https://what-now-chaos.vercel.app/",
      thumbnail: "/Images/whatnowchaos.png",
      isIframable: true
    },
    {
      title: "Łowisko Lipus",
      description: "Responsywna strona internetowa dla łowiska komercyjnego z galerią i systemem administrowania postami",
      buttonContent: "Zobacz projekt",
      link: "https://github.com/KPZ231/lipus",
      thumbnail: "/Images/GitHub.png",
      isIframable: false
    },
    {
      title: "Challengify",
      description: "Platforma webowa do codziennych wyzwań programistycznych z systemem 24-godzinnych zadań",
      buttonContent: "Zobacz projekt",
      link: "https://github.com/KPZ231/Challengify-App",
      thumbnail: "/Images/challengify-logo.jpg",
      isIframable: false
    },
    {
      title: "Code Locker",
      description: "Aplikacja do zarządzania snippetami kodu z funkcją udostępniania w zespole",
      buttonContent: "Zobacz projekt",
      link: "https://github.com/KPZ231/Code-Locker",
      thumbnail: "/Images/GitHub.png",
      isIframable: false
    },
  ];


  return (
    <>
      <Hero
        title="Tworzenie stron internetowych Next.js, React & Astro | KPZsProductions"
        desc="Profesjonalne strony internetowe, które zwiększają sprzedaż. Szybkie, responsywne strony www z Next.js i React. SEO-friendly projekty dla firm – studio webowe specjalizujące się w web development."
        ctaButtonContent="Zamów bezpłatną wycenę"
        ctaButtonLink="/contact"
      />
      <Header title="Nowoczesne strony internetowe, które działają dla Twojego biznesu"></Header>
      <Grid
        content_1="Indywidualne projekty stron dopasowane do Twojej marki i celów biznesowych."
        content_2="Błyskawiczne ładowanie i perfekcyjne wyniki w Google – strony SEO-friendly."
        content_3="Optymalizacja stron internetowych pod pozycjonowanie i konwersję."
        content_4="Profesjonalne wsparcie techniczne i regularne aktualizacje."
        header_1="Strony firmowe na wymiar"
        header_2="Szybkie strony internetowe"
        header_3="Optymalizacja pod SEO"
        header_4="Utrzymanie i rozwój"
      />
      <Header title="Dlaczego KPZsProductions – profesjonalna agencja webowa?"></Header>
      <Grid
        content_1="Projektowanie stron z Next.js, Astro i React – najnowsze technologie web development."
        content_2="Responsywne strony www działające perfekcyjnie na każdym urządzeniu."
        content_3="Czysty kod w Tailwind CSS zapewniający szybkość i łatwą rozbudowę."
        content_4="Transparentna współpraca i dotrzymywanie terminów."
        header_1="Nowoczesne technologie"
        header_2="Responsywność i UX"
        header_3="Skalowalny kod"
        header_4="Profesjonalizm"
      />


      <Header title="Nasze realizacje – portfolio projektów webowych"></Header>
      <ProjectsCarousel ProjectsShown={projects}></ProjectsCarousel>
      
      <CTA title="Potrzebujesz profesjonalnej strony internetowej?"
        description="Studio webowe KPZsProductions tworzy strony www i sklepy internetowe, które przyciągają klientów i zwiększają sprzedaż. Porozmawiajmy o Twoim projekcie."
        ctaButtonContent="Bezpłatna konsultacja i wycena"
        ctaButtonLink="/contact"
      ></CTA>
    </>
  );
}
