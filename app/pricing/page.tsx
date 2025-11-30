'use client'
import Head from "next/head";
import Hero from "../components/HeroSection";
import PricingForm from "../components/PricingForm";


export default function Pricing(){
    return(
        <>
            <Hero 
            title="Wycena strony internetowej – poznaj koszt Twojego projektu" 
            desc="Transparentna wycena tworzenia stron internetowych dostosowana do Twoich potrzeb. Skorzystaj z kalkulatora, aby natychmiast oszacować koszt i czas realizacji projektu. Zero ukrytych opłat – tylko uczciwa wycena oparta na rzeczywistych wymaganiach."
            ctaButtonContent="Oblicz koszt strony"
            ctaButtonLink="#pricingForm"
            ></Hero>
            <div id="pricingForm">
            <PricingForm></PricingForm>
            </div>
        </>
    );
}
