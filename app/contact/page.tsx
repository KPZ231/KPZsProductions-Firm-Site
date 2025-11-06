"use client";
import Hero from "../components/HeroSection";
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <>
      <Hero
        title="Let's Build Something Amazing Together"
        desc="I'm Kacper Duda the developer behind KPZsProductions.Whether you have a project idea, a question, or want to discuss collaboration, I'm here to help. Let's create a website that's fast, modern, and tailored to your needs."
        ctaButtonContent="Get Your Website Today"
        ctaButtonLink="/pricing"
      ></Hero>
      <ContactForm />
    </>
  );
}
