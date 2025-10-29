"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar w-full h-[120px] bg-white flex items-center justify-between px-8">
      <div className="logo w-[40%] flex items-center">
        <Link href={"/home"}>
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
