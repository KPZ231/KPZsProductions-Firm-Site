import { Project } from "../classes/Projects";
import ProjectsGrid from "../components/ProjectsGrid";
import Hero from "../components/HeroSection";
import Header from "../components/Header";
import Grid from "../components/Grid";
import CTA from "../components/CTA";


export default function Portfolio() {
  const projects: Project[] = [
    {
      title: "Whatnow!? - Chaos",
      description: "Interaktywna aplikacja imprezowa łącząca znajomych poprzez zabawne wyzwania i dynamiczną rozgrywkę",
      buttonContent: "Zobacz projekt",
      link: "https://what-now-chaos.vercel.app/",
      thumbnail: "/Images/whatnowchaos.png",
      isIframable: true
    },
    {
      title: "Łowisko Lipus",
      description: "Responsywna strona internetowa dla łowiska komercyjnego z galerią, mapą i formularzem kontaktowym",
      buttonContent: "Zobacz projekt",
      link: "https://github.com/KPZ231/lipus",
      thumbnail: "/Images/GitHub.png",
      isIframable: false
    },
    {
      title: "Challengify",
      description: "Platforma webowa do codziennych wyzwań programistycznych – użytkownicy mają 24h na wykonanie losowego zadania",
      buttonContent: "Zobacz projekt",
      link: "https://github.com/KPZ231/Challengify-App",
      thumbnail: "/Images/challengify-logo.jpg",
      isIframable: false
    },
    {
      title: "Code Locker",
      description: "Aplikacja do zarządzania i udostępniania snippetów kodu w zespole deweloperskim",
      buttonContent: "Zobacz projekt",
      link: "https://github.com/KPZ231/Code-Locker",
      thumbnail: "/Images/GitHub.png",
      isIframable: false
    },
    {
      title: "Grupa Luxpol",
      description: "Profesjonalny sklep internetowy z WordPress WooCommerce – pełna integracja płatności i zarządzanie produktami",
      buttonContent: "Zobacz projekt",
      link: "https://grupaluxpol.pl/",
      thumbnail: "/Images/grupa_luxpol_logo (1).webp",
      isIframable: false
    },
    {
      title: "SCP 173 - Decontamination",
      description: "Gra komputerowa osadzona w uniwersum SCP – wyścig z czasem w czyszczeniu klatki obiektu SCP-173",
      buttonContent: "Zobacz projekt",
      link: "https://kacper-duda.itch.io/scp-173-decontamination",
      thumbnail: "/Images/EE_5wb.png",
      isIframable: false
    },
    {
      title: "Dino Clicker",
      description: "Gra w stylu idle clicker osadzona w świecie dinozaurów – kolekcjonuj zasoby i rozwijaj swoją wymarłą cywilizację",
      buttonContent: "Zobacz projekt",
      link: "https://kacper-duda.itch.io/dino-clicker",
      thumbnail: "/Images/dinoclicker.png",
      isIframable: false
    },   
  ];


  return (
    <>
      <Hero
        title="Portfolio projektów – profesjonalne strony internetowe i aplikacje webowe"
        desc="Odkryj zrealizowane projekty KPZsProductions: nowoczesne strony internetowe, sklepy e-commerce i aplikacje webowe stworzone z Next.js, React i Astro. Zobacz, jak łączę technologię z designem, aby tworzyć responsywne strony www generujące rezultaty."
        ctaButtonContent="Zamów swoją stronę internetową"
        ctaButtonLink="/contact"
      ></Hero>
      <Header title="Zrealizowane projekty webowe"></Header>


      <ProjectsGrid projects={projects}></ProjectsGrid>
      <Header title="Co wyróżnia moje projekty?"></Header>
      <Grid
        header_1="Nowoczesny design"
        header_2="Indywidualne rozwiązania"
        header_3="Najnowsze technologie"
        header_4="Perfekcja w detalu"
        content_1="Responsywne strony www z czystym interfejsem i błyskawiczną wydajnością."
        content_2="Każda strona internetowa dopasowana do celów biznesowych i grupy docelowej."
        content_3="Web development z Next.js, React i Astro – szybkie, skalowalne i SEO-friendly."
        content_4="Optymalizacja każdego projektu pod kątem estetyki, użyteczności i szybkości ładowania."
      ></Grid>
      <CTA
        title="Potrzebujesz profesjonalnej strony internetowej?"
        description="Studio webowe KPZsProductions tworzy strony www i sklepy internetowe, które przyciągają klientów i zwiększają sprzedaż. Porozmawiajmy o Twoim projekcie."
        ctaButtonContent="Bezpłatna wycena strony"
        ctaButtonLink="/contact"
      ></CTA>
    </>
  );
}
