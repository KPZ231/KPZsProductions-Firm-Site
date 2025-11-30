"use client";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <div className="h-120 flex flex-col justify-center gap-5 mx-auto items-center">
        <h1 className="font-bold text-2xl">Nie znaleziono strony o podanym indeksie</h1>
        <Link className="underline" href={"/"}>Wróć do strony głównej</Link>
      </div>
    </>
  );
}
