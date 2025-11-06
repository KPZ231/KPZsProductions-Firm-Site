"use client";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

function getCurrentYear() {
  let year = new Date().getFullYear();
  return year;
}

export default function Footer() {
  return (
    <>
      <section className="w-full h-auto bg-white text-black text-lg md:text-2xl flex flex-col">
        <div className="flex flex-col md:flex-row justify-evenly p-8 md:p-12 gap-8 md:gap-0">
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
            <Image
              src={"/Images/logo.png"}
              alt="KPZsProductions Logo"
              width={300}
              height={120}
              className="w-[250px] md:w-[400px]"
            ></Image>
          </div>
          <div className="flex flex-col w-full md:w-1/3 items-center">
            <h3 className="font-bold mb-2">Qucik Links</h3>
            <Link href={"/"}>Home</Link>
            <Link href={"/contact"}>Contact</Link>
            <Link href={"/portfolio"}>Portfolio</Link>
            <Link href={"/about-us"}>About Us</Link>
            <Link href={"/pricing"}>Pricing</Link>
          </div>
          <div className="flex flex-col w-full md:w-1/3 items-center">
            <h3 className="font-bold mb-2">Social Media</h3>
            <div className="flex flex-row items-center gap-4 text-3xl md:text-4xl pt-2">
              <Link href={"/instaram"}>
                <FaInstagram></FaInstagram>
              </Link>
              <Link href={"/linkedin"}>
                <FaLinkedin></FaLinkedin>
              </Link>
              <Link href={"/facebook"}>
                <FaFacebook></FaFacebook>
              </Link>
            </div>
            <div className="flex flex-col items-center p-6">
              <h3><b>Contact Info</b></h3>
              <Link  className="text-[1rem] mt-2" href={"tel:+48501740587"}>+48 501 740 587</Link>
              <Link className="text-[1rem] mt-2" href={"mailto:kpzsproductionscontact@gmail.com"}>kpzsproductionscontact@gmail.com</Link>
            </div>
          </div>
        </div>
        <hr className="w-full mt-4 md:mt-8" />
        <div className="flex flex-row items-center pt-6 pb-6 md:pt-8 md:pb-8 mx-auto">
          <p className="text-sm md:text-base">
            Copyright © {getCurrentYear()} KPZsProductions
          </p>
        </div>
      </section>
    </>
  );
}
