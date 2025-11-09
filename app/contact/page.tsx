"use client";
import Hero from "../components/HeroSection";
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      <Hero
        title="Stwórzmy coś niesamowitego razem"
        desc="Jestem Kacper Duda, twórca KPZsProductions. Niezależnie od tego, czy masz pomysł na projekt, pytania, czy chcesz omówić współpracę, jestem tutaj, aby pomóc. Stwórzmy stronę, która będzie szybka, nowoczesna i dopasowana do Twoich potrzeb."
        ctaButtonContent="Zamów swoją stronę już dziś"
        ctaButtonLink="/pricing"
      ></Hero>
      <ContactForm />
    </>
  );
}
