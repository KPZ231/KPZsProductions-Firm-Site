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
    title: "Faza 1",
    description: "Pierwsze kroki w świecie programowania — rozpoczęcie nauki tworzenia gier w silniku Unity. To właśnie wtedy narodziła się pasja do kodu i kreatywnego projektowania.",
  },
  {
    year: 2020,
    title: "Faza 2",
    description: "Publikacja pierwszej autorskiej gry. Pierwszy projekt, pierwsze wyzwania i pierwsza satysfakcja z ukończonego dzieła.",
  },
  {
    year: 2022,
    title: "Faza 3",
    description: "Premiera kolejnej gry — bardziej dopracowanej, ambitniejszej i stanowiącej kolejny krok w rozwoju umiejętności programistycznych oraz designerskich.",
  },
  {
    year: 2023,
    title: "Faza 4",
    description: "Rozpoczęcie przygody z tworzeniem stron internetowych. Od prostych projektów po coraz bardziej zaawansowane aplikacje webowe.",
  },
  {
    year: 2025,
    title: "Faza 5",
    description: "Dołączenie do zespołu Sixteractive jako programista WordPress. Praca nad profesjonalnymi projektami komercyjnymi i dalsze doskonalenie warsztatu.",
  },
  {
    year: 2025,
    title: "Faza 6",
    description: "Wydanie pierwszych autorskich stron internetowych — realizacja własnych pomysłów i wizji od zera do gotowego produktu.",
  }
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
