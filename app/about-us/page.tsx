import Hero from "../components/HeroSection";
import Timeline from "../components/Timeline";
import { TimelineItem } from "../classes/TimelineClass";
import Header from "../components/Header";
import CitedText from "../components/CitedText";
import Grid from "../components/Grid";
import ImageGrid from "../components/ImageGrid";
import CTA from "../components/CTA";


const timelineItems: TimelineItem[] = [
  {
    year: 2019,
    title: "Początek programowania",
    description: "Pierwsze kroki w web development – nauka Unity i podstaw programowania. Początek pasji do tworzenia aplikacji i rozwiązań cyfrowych.",
  },
  {
    year: 2020,
    title: "Pierwszy projekt",
    description: "Publikacja pierwszej autorskiej aplikacji – praktyczna nauka projektowania interfejsów i logiki biznesowej.",
  },
  {
    year: 2022,
    title: "Rozszerzenie kompetencji",
    description: "Rozwój umiejętności w zakresie front-end development – bardziej zaawansowane projekty z naciskiem na UX i wydajność.",
  },
  {
    year: 2023,
    title: "Start z web development",
    description: "Profesjonalne tworzenie stron internetowych – pierwsze projekty dla klientów biznesowych z Next.js i React.",
  },
  {
    year: 2025,
    title: "Współpraca z Sixteractive",
    description: "Dołączenie do zespołu jako WordPress developer – realizacja komercyjnych projektów e-commerce i stron firmowych.",
  },
  {
    year: 2025,
    title: "KPZsProductions",
    description: "Założenie studio webowego – kompleksowe projektowanie stron internetowych i sklepów online z nowoczesnymi technologiami.",
  }
];



export default function AboutUs() {
  return (
    <>
      <Hero
        title="O nas – studio webowe tworząc profesjonalne strony internetowe"
        desc="KPZsProductions to studio webowe specjalizujące się w tworzeniu szybkich, responsywnych stron www z Next.js, React i Astro. Projektujemy nowoczesne strony internetowe dla firm, sklepy e-commerce oraz aplikacje webowe – SEO-friendly, skalowalne i dopasowane do Twojej marki."
        ctaButtonContent="Rozpocznij współpracę"
        ctaButtonLink="/contact"
      ></Hero>


      <Timeline items={timelineItems.map(item => ({
        ...item,
        year: item.year.toString()
      }))}></Timeline>
      <CitedText content="Studio webowe KPZsProductions tworzy profesjonalne strony internetowe, które generują rezultaty i rozwijają Twój biznes. Każdy projekt to indywidualne podejście – responsywne strony www zoptymalizowane pod szybkość ładowania, pozycjonowanie w Google i konwersję. Od stron firmowych po sklepy internetowe z WordPress WooCommerce."></CitedText>
      
      <Header title="Nasze wartości"></Header>
      <Grid
        header_1="Precyzja techniczna"
        content_1="Czysty kod, optymalizacja wydajności i dbałość o każdy szczegół interfejsu użytkownika."
        header_2="Szybkość ładowania"
        content_2="Strony SEO-friendly z błyskawicznym czasem ładowania – kluczowe dla konwersji i rankingu."
        header_3="Transparentna współpraca"
        content_3="Jasna komunikacja na każdym etapie – wiesz co tworzymy, dlaczego i w jakim terminie."
        header_4="Nowoczesny web design"
        content_4="Responsywne strony www z czystym interfejsem dopasowanym do tożsamości Twojej marki."
      ></Grid>
      
      <Header title="Technologie web development"></Header>
      <ImageGrid></ImageGrid>
      
      <CTA 
        title="Potrzebujesz profesjonalnej strony internetowej?" 
        description="Studio webowe KPZsProductions tworzy strony www i sklepy internetowe, które przyciągają klientów i zwiększają sprzedaż. Porozmawiajmy o Twoim projekcie." 
        ctaButtonContent="Bezpłatna wycena strony" 
        ctaButtonLink="/contact"
      ></CTA>
    </>
  );
}
