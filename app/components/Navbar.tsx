"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Navbar() {
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (navbar) {
      gsap.fromTo(
        navbar,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="navbar w-full h-[120px] bg-white flex items-center justify-between px-8"
    >
      <div className="logo w-[40%] flex items-center">
        <Link href={"/"}>
          <Image
            src={"/Images/logo.png"}
            alt="logo kpzsproductions"
            width={180}
            height={60}
            priority
          />
        </Link>
      </div>

      <div className="links w-[60%] flex items-center flex-row gap-4">
        <Link href={"/about-us"} className="nav-link" target="_self">
          About US
        </Link>
        <p>|</p>
        <Link href={"/portfolio"} className="nav-link" target="_self">
          Portfolio
        </Link>
        <p>|</p>
        <Link href={"/contact"} className="nav-link" target="_self">
          Contact
        </Link>
      </div>
    </nav>
  );
}
