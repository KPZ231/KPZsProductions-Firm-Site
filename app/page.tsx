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
      description: "Whatnow!? - Chaos to aplikacja imprezowa której celem jest łączenie zajmoych za pomocą śmiesznych wyzwań",
      buttonContent: "Zobacz projekt",
      link: "https://what-now-chaos.vercel.app/",
      thumbnail: "/Images/whatnowchaos.png",
      isIframable: true
    },
    {
      title: "Łowisko Lipus - Strona łowiska komercyjnego",
      description: "Łowisko Lipus - Strona łowiska komercyjnego umieszczonego w Mikołowie",
      buttonContent: "Zobacz projekt",
      link: "https://github.com/KPZ231/lipus",
      thumbnail: "/Images/GitHub.png",
      isIframable: false
    },
    {
      title: "Challengify",
      description: "Challengify to platforma do pokazywania swoich umiejetnosci, ktora losuje jedno losowe zadanie dziennie, i użytkownicy maja 24h na wykonanie zadania",
      buttonContent: "Zobacz projekt",
      link: "https://github.com/KPZ231/Challengify-App",
      thumbnail: "/Images/challengify-logo.jpg",
      isIframable: false
    },
    {
      title: "Code Locker",
      description: "Strona do zapisywania swoich snippetów kodu i dzielenie sie nimi z innymi",
      buttonContent: "Zobacz projekt",
      link: "https://github.com/KPZ231/Code-Locker",
      thumbnail: "/Images/GitHub.png",
      isIframable: false
    },
  ];

  return (
    <>
      <Hero
        title="Nowoczesne strony internetowe stworzone za pomocą Next.js, Astro & React – <b>KPZsProductions"
        desc="Tworzymy szybkie, responsywne i efektowne wizualnie strony internetowe napędzane przez Next.js, Astro, React i Tailwind CSS. Zwiększ swoją widoczność SEO, wydajność i tożsamość marki dzięki stronie, która wyróżnia się w dzisiejszym cyfrowym świecie."
        ctaButtonContent="Stwórzmy razem twoją strone"
        ctaButtonLink="/contact"
      />
      <Header title="Tworzenie szybkich, pięknych i skalowalnych doświadczeń internetowych"></Header>
      <Grid
        content_1="Projektowane i kodowane od podstaw dla Twojej marki."
        content_2="Błyskawiczne ładowanie i perfekcyjne wyniki w Lighthouse."
        content_3="Widoczność, która generuje rzeczywiste rezultaty."
        content_4="Niezawodne aktualizacje i długoterminowa współpraca."
        header_1="Strony na zamówienie"
        header_2="Optymalizacja wydajności"
        header_3="Konfiguracja SEO & analityki"
        header_4="Utrzymanie i wsparcie"
      />
      <Header title="Dlaczego warto pracować z KPZsProductions?"></Header>
      <Grid
        content_1="Nowoczesne frameworki takie jak Next.js i Astro."
        content_2="Prędkość, SEO i doświadczenie użytkownika."
        content_3="Kodowanie w React i Tailwind CSS."
        content_4="Komunikacja i terminowa realizacja."
        header_1="Stworzone z"
        header_2="Skupienie na"
        header_3="Czysty, skalowalny"
        header_4="Przejrzysty"
      />

      <Header title="Projekty, które mówią same za siebie"></Header>
      <ProjectsCarousel ProjectsShown={projects}></ProjectsCarousel>
      
      <CTA title="Gotowy, aby stworzyć coś niesamowitego?"
        description="Stwórzmy stronę, która szybko przyniesie rezultaty, jest nowoczesna i gotowa na rozwój."
        ctaButtonContent="Uzyskaj darmową wycenę lub skontaktuj się z nami"
        ctaButtonLink="/contact"
      ></CTA>
    </>
  );
}
