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
    {
      title: "Luxpol - Strona firmowa",
      description: "Strona firmy luxpol sklep internetowy przy uzyciu woocomerce. ",
      buttonContent: "Zobacz projekt",
      link: "https://grupaluxpol.pl/",
      thumbnail: "/Images/grupa_luxpol_logo (1).webp",
      isIframable: false
    },
    {
      title: "SCP 173 - Decontaminaion",
      description: "Gra komputerowa umieszczona w świecie SCP - gracz musi jak najszybicej wysprzątac klate obiektu SCP 173",
      buttonContent: "Zobacz projekt",
      link: "https://kacper-duda.itch.io/scp-173-decontamination",
      thumbnail: "/Images/EE_5wb.png",
      isIframable: false
    },
    {
      title: "Dino Cliker",
      description: "Gra komputerowa przypominająca Cookie Cliker - umiesczona w swiecie dinozaurów",
      buttonContent: "Zobacz projekt",
      link: "https://kacper-duda.itch.io/dino-clicker",
      thumbnail: "/Images/dinoclicker.png",
      isIframable: false
    },   
  ];

  return (
    <>
      <Hero
        title="Prezentacja moich prac – strony internetowe, które działają i inspirują"
        desc="W KPZsProductions tworzę nowoczesne, szybkie i atrakcyjne wizualnie strony internetowe, korzystając z Next.js, Astro, React i Tailwind CSS. Oto wybór projektów, które pokazują moje umiejętności, kreatywność oraz zaangażowanie w dostarczanie wysokiej jakości doświadczeń cyfrowych."
        ctaButtonContent="Zamów swoją stronę już dziś"
        ctaButtonLink="/contact"
      ></Hero>
      <Header title="Wyróżnione projekty"></Header>

      <ProjectsGrid projects={projects}></ProjectsGrid>
      <Header title="Co tu znajdziesz"></Header>
      <Grid
        header_1="Nowoczesne strony"
        header_2="Rozwiązania szyte na miarę"
        header_3="Doskonalenie techniczne"
        header_4="Dbałość o detale"
        content_1="Czysty design, szybka wydajność, responsywne układy."
        content_2="Każdy projekt dopasowany do celów i odbiorców klienta."
        content_3="Stworzone przy użyciu najnowszych technologii internetowych, z myślą o skalowalności i SEO."
        content_4="Każdy projekt dopracowany pod względem estetyki, użyteczności i szybkości."
      ></Grid>
      <CTA
        title="Gotowy stworzyć coś niesamowitego?"
        description="Stwórzmy stronę, która szybko przyniesie rezultaty, jest nowoczesna i gotowa na rozwój."
        ctaButtonContent="Uzyskaj darmową wycenę lub skontaktuj się z nami"
        ctaButtonLink="/contact"
      ></CTA>
    </>
  );
}
