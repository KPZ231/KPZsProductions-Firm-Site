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
    year: 2020,
    title: "Faza 1",
    description: "Wstępne planowanie i koncepcja.",
  },
  {
    year: 2021,
    title: "Faza 2",
    description: "Rozwój i testowanie.",
  },
  {
    year: 2022,
    title: "Faza 3",
    description: "Wdrażanie i uruchomienie.",
  },
  {
    year: 2023,
    title: "Faza 4",
    description: "Wsparcie i utrzymanie po uruchomieniu.",
  },
];

export default function AboutUs() {
  return (
    <>
      <Hero
        title="Przekształcanie pomysłów w szybkie, nowoczesne i skalowalne strony internetowe"
        desc="Jestem Kacper Duda, założyciel i twórca KPZsProductions — studia kreatywnego skupionego na tworzeniu szybkich, nowoczesnych i efektownych wizualnie stron internetowych wykorzystujących Next.js, Astro, React i Tailwind CSS. Moim celem jest proste: tworzyć doświadczenia internetowe, które są nie tylko piękne, ale także błyskawicznie szybkie i przyjazne SEO."
        ctaButtonContent="Stwórzmy razem Twoją stronę"
        ctaButtonLink="/contact"
      ></Hero>

      <Timeline items={timelineItems.map(item => ({
        ...item,
        year: item.year.toString()
      }))}></Timeline>
      <CitedText content="Moja misja to tworzenie stron, które inspirują, osiągają wyniki i rosną wraz z Twoim biznesem. Każdy projekt jest wyjątkowy, a każdą stronę traktuję jak długoterminową inwestycję w Twoją obecność w sieci — zoptymalizowaną pod kątem szybkości, SEO i spójności designu."></CitedText>
      
      <Header title="Wartości"></Header>
      <Grid
        header_1="Precyzja"
        content_1="Każdy detal ma znaczenie — od pikseli po wydajność."
        header_2="Wydajność"
        content_2="Szybkie strony lepiej konwertują, a ja dbam o to, by tak było."
        header_3="Przejrzystość"
        content_3="Zawsze wiesz, co jest tworzone i dlaczego."
        header_4="Nowoczesny design"
        content_4="Czysty, odważny i dopasowany do Twojej marki."
      ></Grid>
      
      <Header title="Technologie"></Header>
      <ImageGrid></ImageGrid>
      
      <CTA 
        title="Gotowy, aby stworzyć coś niesamowitego?" 
        description="Stwórzmy stronę, która szybko przyniesie rezultaty, jest nowoczesna i gotowa na rozwój." 
        ctaButtonContent="Uzyskaj darmową wycenę lub skontaktuj się z nami" 
        ctaButtonLink="/contact"
      ></CTA>
    </>
  );
}
