'use client'
import Head from "next/head";
import Hero from "../components/HeroSection";
import PricingForm from "../components/PricingForm";

export default function Pricing(){
    return(
        <>
            <Hero 
            title="Dowiedz się, ile kosztuje Twoja strona internetowa" 
            desc="Zaplanuj swój kolejny projekt z pewnością. Skorzystaj z poniższego kalkulatora, aby natychmiast oszacować koszt oraz czas wykonania strony. Bez ukrytych opłat — tylko przejrzysta wycena oparta na Twoich celach i wymaganiach."
            ctaButtonContent="Rozpocznij wycenę"
            ctaButtonLink="#pricingForm"
            ></Hero>
            <div id="pricingForm">
            <PricingForm></PricingForm>
            </div>
        </>
    );
}
