"use client";
interface GridContentProps {
  content_1: string;
  content_2: string;
  content_3: string;
  content_4: string;
  header_1: string;
  header_2: string;
  header_3: string;
  header_4: string;
}

export default function Grid({
  header_1,
  header_2,
  header_3,
  header_4,
  content_1,
  content_2,
  content_3,
  content_4,
}: GridContentProps) {
  return (
    <>
      <section className="w-[90%] h-[50vh] grid grid-cols-2 grid-rows-2 gap-4 m-auto">
        <div className="bg-[#D9D9D9] w-full h-full rounded-4xl p-8">
            <div className="flex flex-col">
                <h3 className="text-black font-bold text-4xl">{header_1}</h3>
                <p className="text-black text-2xl">{content_1}</p>
            </div>
        </div>
       <div className="bg-[#D9D9D9] w-full h-full rounded-4xl p-8">
            <div className="flex flex-col">
                <h3 className="text-black font-bold text-4xl">{header_2}</h3>
                <p className="text-black text-2xl">{content_2}</p>
            </div>
        </div>
        <div className="bg-[#D9D9D9] w-full h-full rounded-4xl p-8">
            <div className="flex flex-col">
                <h3 className="text-black font-bold text-4xl">{header_3}</h3>
                <p className="text-black text-2xl">{content_3}</p>
            </div>
        </div>
        <div className="bg-[#D9D9D9] w-full h-full rounded-4xl p-8">
            <div className="flex flex-col">
                <h3 className="text-black font-bold text-4xl">{header_4}</h3>
                <p className="text-black text-2xl">{content_4}</p>
            </div>
        </div>
      </section>
    </>
  );
}
