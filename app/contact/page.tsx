"use client";
import Hero from "../components/HeroSection";
import ContactForm from '../components/ContactForm';


export default function Contact() {
  return (
    <>
      <Hero
        title="Kontakt – porozmawiajmy o Twoim projekcie strony internetowej"
        desc="Studio webowe KPZsProductions specjalizuje się w tworzeniu profesjonalnych stron internetowych i sklepów online. Masz pomysł na stronę firmową, sklep e-commerce lub aplikację webową? Skontaktuj się – omówimy Twoje potrzeby i stworzymy responsywną stronę www, która zwiększa sprzedaż i widoczność w Google."
        ctaButtonContent="Zobacz cennik i wycenę"
        ctaButtonLink="/pricing"
      ></Hero>
      <ContactForm />
    </>
  );
}
